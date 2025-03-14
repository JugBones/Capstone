from fastapi import FastAPI, Depends, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
import crud, models, schemas
from database import SessionLocal, engine
from schemas import UpdateProgressLevelRequest
from serpapi import GoogleSearch
from dotenv import load_dotenv
import os
from openai import Client
import requests
import serpapi

# Load environment variables
load_dotenv()

# Get the SerpAPI Key
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

# Get the API key from environment variables
GITHUB_ACCESS_TOKEN = os.getenv("GITHUB_ACCESS_TOKEN")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://capstone-parentdashboard.web.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create the tables in the database
models.Base.metadata.create_all(bind=engine)


# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users/{firebase_uid}", response_model=schemas.User)
def get_user(firebase_uid: str, db: Session = Depends(get_db)):
    user = crud.get_user(db, firebase_uid)
    return user


@app.post("/users/{firebase_uid}/profile_picture")
async def upload_profile_picture(
    firebase_uid: str, file: UploadFile, db: Session = Depends(get_db)
):
    """
    Endpoint to upload and update the user's profile picture.
    """
    # Save the uploaded image to imgBB
    imgBB_api_key = os.getenv("IMGBB_API_KEY")
    imgBB_url = "https://api.imgbb.com/1/upload"

    try:
        # Convert the uploaded file to bytes
        file_bytes = await file.read()

        # Send a POST request to imgBB
        response = requests.post(
            imgBB_url,
            data={"key": imgBB_api_key},
            files={"image": ("image", file_bytes, file.content_type)},
        )

        if response.status_code != 200:
            raise HTTPException(
                status_code=500, detail="Failed to upload image to imgBB"
            )

        # Extract the image URL from the response
        image_url = response.json().get("data", {}).get("url")

        if not image_url:
            raise HTTPException(status_code=500, detail="Failed to retrieve image URL")

        # Update the user's profile picture in the database
        updated_user = crud.update_user_profile_picture(db, firebase_uid, image_url)

        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found")

        return {
            "message": "Profile picture updated successfully",
            "image_url": image_url,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/users/{firebase_uid}/profile_picture")
def get_profile_picture(firebase_uid: str, db: Session = Depends(get_db)):
    """
    Endpoint to retrieve the user's profile picture URL.
    """
    profile_picture_url = crud.get_user_profile_picture(db, firebase_uid)
    if not profile_picture_url:
        raise HTTPException(status_code=404, detail="Profile picture not found")
    return {"profile_picture_url": profile_picture_url}


@app.get("/progress/{firebase_uid}")
def get_progress_by_user(
    firebase_uid: str, course_name: str, db: Session = Depends(get_db)
):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    progress_entries = (
        db.query(models.Progress)
        .join(models.Course, models.Progress.course_id == models.Course.id)
        .filter(models.Progress.user_id == user_id, models.Course.name == course_name)
        .all()
    )

    if not progress_entries:
        raise HTTPException(
            status_code=404, detail="No progress data found for this user."
        )

    return [
        {
            "level": entry.level,
            "attendance": entry.attendance,
            "activity": entry.activity,
            "understanding": entry.understanding,
            "task_completion": entry.task_completion,
        }
        for entry in progress_entries
    ]


@app.put("/progress/{firebase_uid}")
def update_progress_level(
    firebase_uid: str,
    request: UpdateProgressLevelRequest,
    db: Session = Depends(get_db),
):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    # Find the progress entry for the specified course
    course = (
        db.query(models.Course)
        .filter(models.Course.name == request.course_name)
        .first()
    )
    if not course:
        raise HTTPException(status_code=404, detail="Course not found.")

    progress_entry = (
        db.query(models.Progress)
        .filter(
            models.Progress.user_id == user_id, models.Progress.course_id == course.id
        )
        .first()
    )

    if not progress_entry:
        raise HTTPException(
            status_code=404, detail="Progress data not found for this user and course."
        )

    # Update the progress level
    progress_entry.level = request.level
    db.commit()
    return {"message": "Progress level updated successfully"}


@app.get("/classes/{class_id}", response_model=schemas.Class)
def get_class(class_id: int, db: Session = Depends(get_db)):
    class_data = crud.get_class(db, class_id)
    if not class_data:
        raise HTTPException(status_code=404, detail="Class not found")
    return class_data


@app.get("/subtopics/{course_name}")
def get_subtopics(course_name: str, db: Session = Depends(get_db)):
    subtopics = (
        db.query(models.Subtopic)
        .join(models.Course, models.Subtopic.course_id == models.Course.id)
        .filter(models.Course.name == course_name)
        .all()
    )
    if not subtopics:
        raise HTTPException(
            status_code=404, detail="No subtopics found for this course."
        )
    return [{"id": subtopic.id, "name": subtopic.name} for subtopic in subtopics]


@app.get("/participation/{firebase_uid}/{subtopic_id}")
def get_participation_by_subtopic(
    firebase_uid: str, subtopic_id: int, db: Session = Depends(get_db)
):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    participation = (
        db.query(models.Participation)
        .filter(
            models.Participation.user_id == user_id,
            models.Participation.subtopic_id == subtopic_id,
        )
        .first()
    )

    if not participation:
        raise HTTPException(
            status_code=404, detail="No participation data found for this subtopic."
        )

    return {
        "audio": participation.audio,
        "video": participation.zoom,
        "chat": participation.chat,
        "poll": participation.poll,
    }


@app.get("/courses", response_model=list[schemas.Course])
def get_courses(db: Session = Depends(get_db)):
    courses = crud.get_all_courses(db)
    return courses


### APPRECIATION ###


# Set up OpenAI Client
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OpenAI API key is not set in the environment variables.")

client = Client()


@app.get("/appreciations/{firebase_uid}")
def get_appreciations(
    firebase_uid: str, include_ai: bool = False, db: Session = Depends(get_db)
):
    """
    Fetch teacher appreciations and optionally generate AI feedback dynamically.
    """
    # Fetch teacher appreciations from the database
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    teacher_appreciations = crud.get_appreciations(db, user_id)
    teacher_feedback = [
        {
            "teacher_name": appreciation.teacher_name,
            "message": appreciation.message,
            "date": appreciation.date.strftime("%Y-%m-%d"),
        }
        for appreciation in teacher_appreciations
    ]

    # Return only teacher appreciations if include_ai is False
    if not include_ai:
        return {"feedback": teacher_feedback}

    # Fetch user's name for personalization
    user = db.query(models.User).filter(models.User.id == user_id).first()
    child_name = user.name if user else "Anak Anda"

    # Generate AI feedback
    progress_entries = crud.get_progress_by_user(db, user_id)
    ai_feedback = []

    for progress in progress_entries:
        good_aspect, improvement_needed, subtopic_suggestions = [], [], []

        # Analyze progress data
        if progress.attendance >= 80:
            good_aspect.append("kehadiran")
        else:
            improvement_needed.append("kehadiran")

        if progress.activity >= 70:
            good_aspect.append("partisipasi aktif")
        else:
            improvement_needed.append("partisipasi aktif")

        if progress.understanding >= 75:
            good_aspect.append("pemahaman konsep")
        else:
            improvement_needed.append("pemahaman konsep")

        if progress.task_completion >= 90:
            good_aspect.append("penyelesaian tugas")
        else:
            improvement_needed.append("penyelesaian tugas")

        # Get subtopic suggestions
        subtopics = crud.get_subtopics_by_course(db, progress.course_id)
        for subtopic in subtopics:
            participation = crud.get_participation_by_subtopic(db, user_id, subtopic.id)
            if participation:
                if participation.audio < 5:
                    subtopic_suggestions.append(
                        f"Subtopik '{subtopic.name}' memerlukan lebih banyak diskusi audio."
                    )
                if participation.chat < 5:
                    subtopic_suggestions.append(
                        f"Gunakan fitur chat lebih sering di subtopik '{subtopic.name}'."
                    )
                if participation.poll != "Completed":
                    subtopic_suggestions.append(
                        f"Pastikan untuk menyelesaikan polling pada subtopik '{subtopic.name}'."
                    )

        # Create AI prompt
        openai_prompt = (
            f"Halo, Orang Tua {child_name}!\n\n"
            f"Berikut adalah evaluasi kemajuan belajar:\n"
            f"- Performa Baik: {', '.join(good_aspect)}.\n"
            f"- Perlu Peningkatan: {', '.join(improvement_needed)}.\n\n"
            f"Beri saran belajar ramah dan mudah dimengerti, "
            f"termasuk untuk subtopik berikut: {', '.join(subtopic_suggestions)}.\n"
            f"Tambahkan materi belajar jika memungkinkan."
            f"Jelaskan metode belajar dan juga materi yang terkait dengan subtopik yang memerlukan pengingkatan "
            f"Jangan terlalu panjang, tapi berikan saran-saran bermakna dan memiliki sentuhan personal"
        )

        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": "Anda adalah AI yang memberikan saran belajar kepada orang tua siswa di CoLearn.",
                    },
                    {"role": "user", "content": openai_prompt},
                ],
                max_tokens=500,
                temperature=0.7,
            )
            ai_message = response.choices[0].message.content.strip()
        except Exception as e:
            print(f"OpenAI API Error: {e}")
            ai_message = "Gagal menghasilkan saran dari AI. Silakan coba lagi nanti."

        # Fetch learning materials
        subtopic_names = [subtopic.name for subtopic in subtopics]
        learning_materials = search_learning_materials(", ".join(subtopic_names))

        # Combine AI suggestions with learning material links
        combined_message = f"{ai_message}\n\n**Materi Tambahan:**\n" + "\n".join(
            [f"- [{item['title']}]({item['link']})" for item in learning_materials]
        )

        ai_feedback.append(
            {
                "teacher_name": "AI Feedback",
                "message": combined_message,
                "date": date.today().strftime("%Y-%m-%d"),
            }
        )

    return {"feedback": teacher_feedback + ai_feedback}


def search_learning_materials(query: str):
    """
    Search for learning materials using SerpAPI.
    """
    params = {
        "q": query,
        "engine": "google",
        "api_key": os.getenv("SERPAPI_API_KEY"),
    }
    try:
        response = requests.get("https://serpapi.com/search", params=params)
        response.raise_for_status()
        results = response.json().get("organic_results", [])
        return [
            {
                "title": result.get("title", "Judul tidak tersedia"),
                "link": result.get("link", "#"),
            }
            for result in results
        ][
            :3
        ]  # Limit to top 3 results
    except Exception as e:
        print(f"Error fetching learning materials: {e}")
        return [{"title": "Tidak dapat memuat materi pembelajaran", "link": "#"}]


### RECOMMENDATIONS ###


@app.get("/recommendations/{firebase_uid}")
def get_recommendations(firebase_uid: str, db: Session = Depends(get_db)):
    """
    Fetch recommendations based on the user's participation and articles from GitHub.
    """
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    # Fetch all participation and subtopic data in a single query
    participation_data = (
        db.query(
            models.Participation.audio,
            models.Participation.chat,
            models.Participation.poll,
            models.Subtopic.id.label("subtopic_id"),
            models.Subtopic.name.label("subtopic_name"),
            models.Subtopic.course_id,
        )
        .join(models.Subtopic, models.Participation.subtopic_id == models.Subtopic.id)
        .filter(models.Participation.user_id == user_id)
        .all()
    )

    # Thresholds
    audio_threshold = 5
    chat_threshold = 6
    poll_threshold = ["lengkap", "Lengkap"]

    # Map course IDs to course names
    course_map = {1: "Matematika", 2: "Fisika"}

    # Determine subtopics with low participation
    lacking_subtopics = {"matematika": [], "fisika": []}

    for record in participation_data:
        if (
            record.audio < audio_threshold
            or record.chat < chat_threshold
            or record.poll.lower() not in poll_threshold
        ):
            course_name = course_map.get(record.course_id)
            if course_name == "Matematika":
                lacking_subtopics["matematika"].append(record.subtopic_name)
            elif course_name == "Fisika":
                lacking_subtopics["fisika"].append(record.subtopic_name)

    # Fetch articles for the recommended subtopics
    recommendations = {"matematika": [], "fisika": []}

    for course_name, subtopics in lacking_subtopics.items():
        for subtopic in subtopics[:3]:  # Limit to top 3 subtopics
            articles = fetch_articles_from_github(subtopic, course_name.capitalize())
            recommendations[course_name].extend(articles)

    # Fetch all articles from the "Lainnya" folder
    lainnya_articles = fetch_articles_from_github("all", "Lainnya")

    # Add "Lainnya" articles to the recommendations
    recommendations["lainnya"] = lainnya_articles

    return {
        "message": "Recommendations generated successfully",
        "lacking_subtopics": lacking_subtopics,
        "recommendations": recommendations,
    }


def fetch_articles_from_github(subtopic, course_name):
    """
    Fetch articles from GitHub for a specific subtopic and course.
    """
    # Map course names to GitHub directory names
    course_directory_map = {
        "Matematika": "Matematika",
        "Fisika": "Fisika",
        "Lainnya": "Lainnya",
    }

    directory = course_directory_map.get(course_name)
    if not directory:
        raise HTTPException(status_code=404, detail="Invalid course name.")

    # GitHub API URL for the directory
    url = f"https://api.github.com/repos/joshualxndrs/MateriBacaan_Parents/contents/{directory}"

    headers = {
        "Authorization": f"Bearer {GITHUB_ACCESS_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        # Filter files matching the subtopic or fetch all if subtopic is "all"
        articles = []
        for item in response.json():
            if subtopic == "all" or subtopic.lower() in item["name"].lower():
                articles.append(
                    {
                        "title": item["name"]
                        .replace(".md", "")
                        .replace("_", " ")
                        .capitalize(),
                        "link": item[
                            "download_url"
                        ],  # Use download_url to fetch raw content
                        "snippet": f"Artikel dari folder {course_name}",
                    }
                )

        if not articles:
            return [
                {
                    "title": f"No articles found in '{course_name}'",
                    "link": "#",
                    "snippet": "",
                }
            ]

        return articles

    except requests.RequestException as e:
        print(f"Error fetching articles from GitHub: {e}")
        raise HTTPException(
            status_code=500, detail="Failed to fetch articles from GitHub."
        )


from fastapi.responses import StreamingResponse


# Proxy route to fetch and serve the requested URL
@app.get("/proxy")
async def proxy_url(url: str = Query(...)):
    if not url:
        raise HTTPException(status_code=400, detail="URL parameter is required.")

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()

        return StreamingResponse(
            response.iter_content(chunk_size=1024),
            headers={
                "Content-Type": response.headers.get("Content-Type", "text/html"),
                "Cache-Control": "no-cache",
            },
        )
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}")
        raise HTTPException(
            status_code=500, detail=f"Failed to fetch the URL: {str(e)}"
        )

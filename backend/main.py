from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta
import crud, models, schemas
from database import SessionLocal, engine
import crud, schemas
from database import SessionLocal
from schemas import UpdateProgressLevelRequest
from serpapi import GoogleSearch
from dotenv import load_dotenv
import os
import requests
import serpapi

# Load environment variables
load_dotenv()

# Get the API key from environment variables
SERPAPI_API_KEY = os.getenv("SERPAPI_API_KEY")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
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


@app.get("/appreciations/{firebase_uid}")
def get_appreciations(firebase_uid: str, db: Session = Depends(get_db)):
    print(f"Fetching appreciations for Firebase UID: {firebase_uid}")
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")
    appreciations = crud.get_appreciations(db, user_id)
    if not appreciations:
        return {"message": "No appreciation data found for this user."}
    print(f"Appreciations found: {len(appreciations)}")
    return [
        {
            "teacher_name": appreciation.teacher_name,
            "message": appreciation.message,
            "date": appreciation.date.strftime("%Y-%m-%d"),
        }
        for appreciation in appreciations
    ]


### RECOMMENDATIONS ###


@app.get("/recommendations/{firebase_uid}")
def get_recommendations(firebase_uid: str, db: Session = Depends(get_db)):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    # Fetch participation data
    participation_data = (
        db.query(models.Participation)
        .filter(models.Participation.user_id == user_id)
        .all()
    )

    if not participation_data:
        raise HTTPException(
            status_code=404, detail="No participation data found for this user."
        )

    # Thresholds
    audio_threshold = 5
    chat_threshold = 6
    poll_threshold = "Completed"

    # Determine subtopics with low participation
    lacking_subtopics = []
    for participation in participation_data:
        if (
            participation.audio < audio_threshold
            or participation.chat < chat_threshold
            or participation.poll != poll_threshold
        ):
            subtopic = (
                db.query(models.Subtopic)
                .filter(models.Subtopic.id == participation.subtopic_id)
                .first()
            )
            if subtopic:
                lacking_subtopics.append(subtopic.name)

    # Generate recommendations
    recommendations = []
    for subtopic in lacking_subtopics:
        # Use SerpAPI or similar tools to search for relevant materials
        search_results = search_web_for_materials(subtopic)
        recommendations.extend(search_results)

    return {
        "message": "Recommendations generated successfully",
        "lacking_subtopics": lacking_subtopics,
        "recommendations": recommendations,
    }


def search_web_for_materials(query):
    """
    Function to search the web for educational materials using SerpAPI.
    """
    if not SERPAPI_API_KEY:
        raise RuntimeError(
            "SerpAPI API key is not configured. Please set it in the .env file."
        )

    params = {
        "q": query,
        "engine": "google",
        "api_key": SERPAPI_API_KEY,
    }

    response = requests.get("https://serpapi.com/search", params=params)
    if response.status_code == 200:
        search_data = response.json()
        results = [
            {
                "title": result["title"],
                "link": result["link"],
                "snippet": result.get("snippet", ""),
            }
            for result in search_data.get("organic_results", [])
        ]
        return results
    else:
        return []

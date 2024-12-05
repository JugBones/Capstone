from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta
import crud, models, schemas
from database import SessionLocal, engine
import crud, schemas
from database import SessionLocal

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
def get_progress_by_user(firebase_uid: str, db: Session = Depends(get_db)):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    progress_entries = (
        db.query(models.Progress)
        .filter(models.Progress.user_id == user_id)
        .all()
    )

    if not progress_entries:
        raise HTTPException(status_code=404, detail="No progress data found for this user.")

    return [
        {
            "attendance": entry.attendance,
            "activity": entry.activity,
            "understanding": entry.understanding,
            "task_completion": entry.task_completion,
        }
        for entry in progress_entries
    ]


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
        raise HTTPException(status_code=404, detail="No subtopics found for this course.")
    return [{"id": subtopic.id, "name": subtopic.name} for subtopic in subtopics]


@app.get("/participation/{firebase_uid}/{subtopic_id}")
def get_participation_by_subtopic(firebase_uid: str, subtopic_id: int, db: Session = Depends(get_db)):
    user_id = crud.get_user_id_by_firebase_uid(db, firebase_uid)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found.")

    participation = (
        db.query(models.Participation)
        .filter(models.Participation.user_id == user_id, models.Participation.subtopic_id == subtopic_id)
        .first()
    )

    if not participation:
        raise HTTPException(status_code=404, detail="No participation data found for this subtopic.")

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
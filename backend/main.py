from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, timedelta
import crud, models, schemas
from database import SessionLocal, engine

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


# Get all tasks
@app.get("/tasks", response_model=list[schemas.Task])
def read_tasks(firebase_uid: str = Query(...), db: Session = Depends(get_db)):
    tasks = crud.get_upcoming_tasks(db, firebase_uid)
    if not tasks:
        raise HTTPException(status_code=404, detail="No upcoming tasks found")
    return tasks


# Fetch Math progress data based on Firebase UID
@app.get("/math_progress", response_model=list[schemas.MathProgress])
def read_math_progress(firebase_uid: str = Query(...), db: Session = Depends(get_db)):
    data = crud.get_math_progress_by_uid(db, firebase_uid)
    if not data:
        raise HTTPException(status_code=404, detail="No math progress data found")
    return data


# Fetch Physics progress data based on Firebase UID
@app.get("/physics_progress", response_model=list[schemas.PhysicsProgress])
def read_physics_progress(
    firebase_uid: str = Query(...), db: Session = Depends(get_db)
):
    data = crud.get_physics_progress_by_uid(db, firebase_uid)
    if not data:
        raise HTTPException(status_code=404, detail="No physics progress data found")
    return data


@app.get("/participation/{firebase_uid}", response_model=schemas.Participation)
def read_participation_data(firebase_uid: str, db: Session = Depends(get_db)):
    data = crud.get_participation_by_uid(db, firebase_uid)
    if not data:
        raise HTTPException(status_code=404, detail="No participation data found")
    return data


@app.get("/subjects", response_model=list[schemas.Subject])
def read_subjects(firebase_uid: str, db: Session = Depends(get_db)):
    subjects = crud.get_subjects_with_schedule_by_uid(db, firebase_uid)
    if not subjects:
        raise HTTPException(status_code=404, detail="No subjects found")
    return subjects


@app.get("/syllabus", response_model=list[schemas.Syllabus])
def read_syllabus(
    class_level: str, curriculum: str, year_semester: str, db: Session = Depends(get_db)
):
    syllabus = crud.get_syllabus(
        db, class_level=class_level, curriculum=curriculum, year_semester=year_semester
    )
    print("Syllabus fetched for frontend:", syllabus)  # Debugging line
    return syllabus


@app.get("/appreciations", response_model=list[schemas.Appreciation])
def read_appreciations(firebase_uid: str = Query(...), db: Session = Depends(get_db)):
    appreciations = crud.get_appreciations_by_uid(db, firebase_uid)
    if not appreciations:
        raise HTTPException(status_code=404, detail="No appreciation messages found")
    return appreciations
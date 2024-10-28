from fastapi import FastAPI, Depends, HTTPException
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
def read_tasks(db: Session = Depends(get_db)):  # The db dependency is injected here
    tasks = crud.get_tasks(db)
    if not tasks:
        raise HTTPException(status_code=404, detail="No tasks found")
    return tasks


@app.get("/math_progress", response_model=list[schemas.MathProgress])
def read_math_progress(db: Session = Depends(get_db)):
    data = crud.get_math_progress(db)
    if not data:
        raise HTTPException(status_code=404, detail="No math progress data found")
    return data


@app.get("/physics_progress", response_model=list[schemas.PhysicsProgress])
def read_physics_progress(db: Session = Depends(get_db)):
    data = crud.get_physics_progress(db)
    if not data:
        raise HTTPException(status_code=404, detail="No physics progress data found")
    return data


@app.get("/participation", response_model=list[schemas.Participation])
def read_participation_data(db: Session = Depends(get_db)):
    data = crud.get_participation_data(db)
    if not data:
        raise HTTPException(status_code=404, detail="No participation data found")
    return data


@app.get("/subjects", response_model=list[schemas.Subject]) # Endpoint to get subjects and their next schedules
def read_subjects(db: Session = Depends(get_db)):
    subjects = crud.get_subjects_with_schedule(db)
    if not subjects:
        raise HTTPException(status_code=404, detail="No subjects found")
    return subjects
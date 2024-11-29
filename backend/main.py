from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import crud, schemas
from database import SessionLocal

app = FastAPI()


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


@app.get("/progress/{user_id}", response_model=list[schemas.Progress])
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    progress = crud.get_progress_by_user(db, user_id)
    return progress

from sqlalchemy.orm import Session

# from datetime import date
import models


# Get all tasks from the database
def get_tasks(db: Session):
    return db.query(models.Task).all()


# Fetch Math progress based on Firebase UID
def get_math_progress_by_uid(db: Session, firebase_uid: str):
    return (
        db.query(models.MathProgress)
        .filter(models.MathProgress.firebase_uid == firebase_uid)
        .all()
    )


# Fetch Physics progress based on Firebase UID
def get_physics_progress_by_uid(db: Session, firebase_uid: str):
    return (
        db.query(models.PhysicsProgress)
        .filter(models.PhysicsProgress.firebase_uid == firebase_uid)
        .all()
    )


def get_participation_by_uid(db: Session, firebase_uid: str):
    return (
        db.query(models.Participation)
        .filter(models.Participation.firebase_uid == firebase_uid)
        .first()
    )


def get_subjects_with_schedule(db: Session):
    return db.query(models.Subject).all()


# Create a new task in the database
# def create_task(db: Session, task: schemas.TaskBase):
#     db_task = models.Task(name=task.name, date=task.date, description=task.description)
#     db.add(db_task)
#     db.commit()
#     db.refresh(db_task)
#     return db_task

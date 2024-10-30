from sqlalchemy.orm import Session, contains_eager

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


def get_subjects_with_schedule_by_uid(db: Session, firebase_uid: str):
    subjects = (
        db.query(models.Subject)
        .join(models.Subject.schedules)  # Join with schedules
        .filter(models.Schedule.firebase_uid == firebase_uid)  # Filter schedules by firebase_uid
        .options(contains_eager(models.Subject.schedules))  # Load schedules with subjects
        .all()
    )
    return subjects
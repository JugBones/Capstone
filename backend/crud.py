from sqlalchemy.orm import Session, contains_eager
from datetime import datetime
import models


# Get all tasks from the database and auto update for the tasks
def get_upcoming_tasks(db: Session, firebase_uid: str):
    today = datetime.now().strftime("%Y-%m-%d")  # Current date in 'YYYY-MM-DD' format
    return (
        db.query(models.Task)
        .filter(models.Task.firebase_uid == firebase_uid, models.Task.date >= today)
        .all()
    )


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
        .filter(
            models.Schedule.firebase_uid == firebase_uid
        )  # Filter schedules by firebase_uid
        .options(
            contains_eager(models.Subject.schedules)
        )  # Load schedules with subjects
        .all()
    )
    return subjects


def get_syllabus(db: Session, class_level: str, curriculum: str, year_semester: str):
    return (
        db.query(models.Syllabus)
        .filter(
            models.Syllabus.class_level == class_level,
            models.Syllabus.curriculum == curriculum,
            models.Syllabus.year_semester == year_semester,
        )
        .all()
    )

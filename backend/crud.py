from sqlalchemy.orm import Session
import models


def get_user(db: Session, firebase_uid: str):
    return (
        db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    )


def get_class(db: Session, class_id: int):
    return db.query(models.Class).filter(models.Class.id == class_id).first()


def get_course(db: Session, course_id: int):
    return db.query(models.Course).filter(models.Course.id == course_id).first()


def get_progress_by_user(db: Session, user_id: int):
    return db.query(models.Progress).filter(models.Progress.user_id == user_id).all()


def get_recommendations(db: Session, course_id: int):
    return (
        db.query(models.Recommendation)
        .filter(models.Recommendation.course_id == course_id)
        .all()
    )


def get_participations(db: Session, user_id: int):
    return (
        db.query(models.Participation)
        .filter(models.Participation.user_id == user_id)
        .all()
    )


def get_achievements(db: Session, user_id: int):
    return (
        db.query(models.Achievement).filter(models.Achievement.user_id == user_id).all()
    )


def get_appreciations(db: Session, user_id: int):
    return (
        db.query(models.Appreciation)
        .filter(models.Appreciation.user_id == user_id)
        .all()
    )

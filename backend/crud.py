from sqlalchemy.orm import Session
import models


def get_user(db: Session, firebase_uid: str):
    return (
        db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    )


def get_user_id_by_firebase_uid(db: Session, firebase_uid: str):
    user = (
        db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    )
    if user:
        return user.id
    return None


def get_class(db: Session, class_id: int):
    return db.query(models.Class).filter(models.Class.id == class_id).first()


def get_course(db: Session, course_id: int):
    return db.query(models.Course).filter(models.Course.id == course_id).first()


def get_all_courses(db: Session):
    return db.query(models.Course).all()


def get_progress_by_user(db: Session, user_id: int):
    return db.query(models.Progress).filter(models.Progress.user_id == user_id).all()


def get_recommendations(db: Session, course_id: int):
    return (
        db.query(models.Recommendation)
        .filter(models.Recommendation.course_id == course_id)
        .all()
    )


# def get_participations(db: Session, user_id: int):
#     return (
#         db.query(models.Participation)
#         .filter(models.Participation.user_id == user_id)
#         .all()
#     )

# def get_participation_by_course(db: Session, user_id: str, course_name: str):
#     return (
#         db.query(models.Participation)
#         .join(models.Subtopic, models.Participation.subtopic_id == models.Subtopic.id)
#         .join(models.Course, models.Subtopic.course_id == models.Course.id)
#         .filter(models.Participation.user_id == user_id, models.Course.name == course_name)
#         .all()
#     )


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


def get_subtopics_by_course(db: Session, course_id: int):
    return (
        db.query(models.Subtopic).filter(models.Subtopic.course_id == course_id).all()
    )


def get_participation_by_subtopic(db: Session, user_id: int, subtopic_id: int):
    return (
        db.query(models.Participation)
        .filter(
            models.Participation.user_id == user_id,
            models.Participation.subtopic_id == subtopic_id,
        )
        .first()
    )

def update_user_profile_picture(db: Session, firebase_uid: str, image_url: str):
    user = db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    if user:
        user.profile_picture = image_url
        db.commit()
        db.refresh(user)
        return user
    return None

def get_user_profile_picture(db: Session, firebase_uid: str):
    user = db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()
    if user:
        return user.profile_picture
    return None


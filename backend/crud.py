from sqlalchemy.orm import Session
# from datetime import date
import models


# Get all tasks from the database
def get_tasks(db: Session):
    return db.query(models.Task).all()


def get_math_progress(db: Session):
    return db.query(models.MathProgress).all()


def get_physics_progress(db: Session):
    return db.query(models.PhysicsProgress).all()


def get_participation_data(db: Session):
    return db.query(models.Participation).all()

def get_subjects_with_schedule(db: Session):
    return db.query(models.Subject).all()

# Create a new task in the database
# def create_task(db: Session, task: schemas.TaskBase):
#     db_task = models.Task(name=task.name, date=task.date, description=task.description)
#     db.add(db_task)
#     db.commit()
#     db.refresh(db_task)
#     return db_task

from sqlalchemy.orm import Session
import models
# import schemas

# Get all tasks from the database
def get_tasks(db: Session):
    return db.query(models.Task).all()

# Create a new task in the database
# def create_task(db: Session, task: schemas.TaskBase):
#     db_task = models.Task(name=task.name, date=task.date, description=task.description)
#     db.add(db_task)
#     db.commit()
#     db.refresh(db_task)
#     return db_task

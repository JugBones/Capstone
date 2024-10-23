from pydantic import BaseModel

# Schema for Task
class TaskBase(BaseModel):
    name: str
    date: str
    description: str

# Schema for Task when reading data (with id)
class Task(TaskBase):
    id: int

    class Config:
        from_attributes = True

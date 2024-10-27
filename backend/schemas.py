from pydantic import BaseModel

# Schema for Task
class TaskBase(BaseModel):
    name: str
    date: str
    description: str

class Task(TaskBase): # Schema for Task when reading data (with id)
    id: int

    class Config:
        from_attributes = True


# schema for progress
class ProgressBase(BaseModel):
    attendance_rate: float
    stickiness_rate: float
    polling_understanding: float

class MathProgress(ProgressBase):
    id: int

    class Config:
        from_attributes = True

class PhysicsProgress(ProgressBase):
    id: int

    class Config:
        from_attributes = True
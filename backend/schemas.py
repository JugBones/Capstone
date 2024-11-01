from pydantic import BaseModel
from datetime import date


# Schema for Task
class TaskBase(BaseModel):
    name: str
    date: str
    description: str
    firebase_uid: str


class Task(TaskBase):  # Schema for Task when reading data (with id)
    id: int

    class Config:
        from_attributes = True


# Schema for Progress
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


class ParticipationBase(BaseModel):
    zoom_video: float
    zoom_audio: float
    zoom_chat: float


class Participation(ParticipationBase):
    id: int

    class Config:
        from_attributes = True


# Schema for Schedule and subject
class ScheduleBase(BaseModel):
    date: date


class Schedule(ScheduleBase):
    id: int

    class Config:
        from_atrributes = True


class SubjectBase(BaseModel):
    name: str


class Subject(SubjectBase):
    id: int
    schedules: list[Schedule] = []

    class Config:
        from_atrributes = True


class Syllabus(BaseModel):
    subject: str
    period_start: date
    period_end: date
    topic: str
    class_level: str
    curriculum: str
    year_semester: str

    class Config:
        from_atrributes = True


class AppreciationBase(BaseModel):
    student_name: str
    teacher_name: str
    message: str
    firebase_uid: str

class Appreciation(AppreciationBase):
    id: int

    class Config:
        from_attributes = True
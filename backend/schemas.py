from pydantic import BaseModel
from datetime import date


class UserBase(BaseModel):
    name: str
    firebase_uid: str
    class_id: int


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class ClassBase(BaseModel):
    name: str
    level: str


class Class(ClassBase):
    id: int

    class Config:
        from_attributes = True


class SubtopicBase(BaseModel):
    course_id: int
    class_id: int
    name: str


class Subtopic(SubtopicBase):
    id: int

    class Config:
        from_attributes = True


class CourseBase(BaseModel):
    name: str


class Course(CourseBase):
    id: int

    class Config:
        from_attributes = True


class ProgressBase(BaseModel):
    user_id: int
    course_id: int
    level: str
    attendance: int
    activity: int
    understanding: int
    task_completion: int


class Progress(ProgressBase):
    id: int

    class Config:
        from_attributes = True


class RecommendationBase(BaseModel):
    course_id: int
    title: str
    description: str
    url: str


class Recommendation(RecommendationBase):
    id: int

    class Config:
        from_attributes = True


class ParticipationBase(BaseModel):
    user_id: int
    subtopic_id: int
    total_interactions: int


class Participation(ParticipationBase):
    id: int

    class Config:
        from_attributes = True


class AchievementBase(BaseModel):
    user_id: int
    course_id: int
    badge_name: str
    date_earned: date


class Achievement(AchievementBase):
    id: int

    class Config:
        from_attributes = True


class AppreciationBase(BaseModel):
    user_id: int
    teacher_name: str
    message: str
    date: date


class Appreciation(AppreciationBase):
    id: int

    class Config:
        from_attributes = True


class SyllabusBase(BaseModel):
    subject: str
    period_start: date
    period_end: date
    topic: str
    class_level: str
    curriculum: str
    year_semester: str


class Syllabus(SyllabusBase):
    id: int

    class Config:
        from_attributes = True

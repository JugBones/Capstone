from sqlalchemy import Column, Integer, String, Float, Date
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    date = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False)

class MathProgress(Base):
    __tablename__ = "math_progress"

    id = Column(Integer, primary_key=True, index=True)
    attendance_rate = Column(Float, nullable=False)
    stickiness_rate = Column(Float, nullable=False)
    polling_understanding = Column(Float, nullable=False)

class PhysicsProgress(Base):
    __tablename__ = "physics_progress"

    id = Column(Integer, primary_key=True, index=True)
    attendance_rate = Column(Float, nullable=False)
    stickiness_rate = Column(Float, nullable=False)
    polling_understanding = Column(Float, nullable=False)
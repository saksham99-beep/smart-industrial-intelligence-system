from sqlalchemy import Column, Integer, String
from database import Base

class SystemLog(Base):
    __tablename__ = "system_logs"

    id = Column(Integer, primary_key=True, index=True)

    level = Column(String, index=True)

    message = Column(String)

    timestamp = Column(String)
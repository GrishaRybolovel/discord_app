from pydantic import BaseModel
from typing import Optional
from sqlalchemy import BigInteger

class IdCheckRequest(BaseModel):
    id: int
    access_key: Optional[str] = None

from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Id(Base):
    __tablename__ = "ids"

    id = Column(BigInteger, primary_key=True)

    def __repr__(self):
        return f"Id(id={self.id})"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, Id
import os

# Get environment variables for database connection
pg_user = os.getenv("PGUSER", "your_default_user")
pg_password = os.getenv("PGPASSWORD", "your_default_password")
pg_database = os.getenv("PGDATABASE", "your_default_database")
pg_host = os.getenv("PGHOST", "localhost")

# Use PostgreSQL instead of SQLite
engine = create_engine(f"postgresql+psycopg2://{pg_user}:{pg_password}@{pg_host}/{pg_database}")
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

def check_id_exists(id):
    return session.query(Id).filter(Id.id == id).first() is not None

def add_id(id):
    id_obj = Id(id=id)
    session.add(id_obj)
    session.commit()

def delete_id(id):
    id_obj = session.query(Id).filter(Id.id == id).first()
    if id_obj:
        session.delete(id_obj)
        session.commit()

def get_all_ids():
    return session.query(Id).all()

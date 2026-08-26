import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

# We use PostgreSQL for production, fallback to sqlite for dev if not provided
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "").strip().strip('"').strip("'")
if not SQLALCHEMY_DATABASE_URL:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./backend_app.db"

# Fix for Render's default postgres:// URL scheme which is unsupported in newer SQLAlchemy versions
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        # check_same_thread is needed only for SQLite
        connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
    )
    # Attempt to connect to verify it's valid
    engine.connect()
except Exception as e:
    print(f"Warning: Failed to connect to DATABASE_URL: {e}. Falling back to SQLite.")
    SQLALCHEMY_DATABASE_URL = "sqlite:///./backend_app.db"
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import json
import os



DATABASE_URL = 'mysql://root:12345@localhost:3306/anime_script'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

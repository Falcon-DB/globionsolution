"""
=========================================================
Globion Solution Pvt. Ltd.
Configuration File
=========================================================
Author : Gourab Karmakar
Project: Globion Website
Framework: Flask
=========================================================
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    """Base Configuration"""

    # --------------------------------------------------
    # Flask
    # --------------------------------------------------
    SECRET_KEY = os.getenv("SECRET_KEY", "change_this_in_production")

    DEBUG = False
    TESTING = False

    # --------------------------------------------------
    # Uploads
    # --------------------------------------------------
    UPLOAD_FOLDER = os.path.join("uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB

    # --------------------------------------------------
    # Database
    # --------------------------------------------------
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --------------------------------------------------
    # Mail (Optional)
    # --------------------------------------------------
    MAIL_SERVER = os.getenv("MAIL_SERVER")

    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))

    MAIL_USE_TLS = True

    MAIL_USE_SSL = False

    MAIL_USERNAME = os.getenv("MAIL_USERNAME")

    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")

    # --------------------------------------------------
    # Session
    # --------------------------------------------------
    SESSION_COOKIE_HTTPONLY = True

    SESSION_COOKIE_SECURE = False

    SESSION_COOKIE_SAMESITE = "Lax"

    # --------------------------------------------------
    # Security
    # --------------------------------------------------
    JSON_SORT_KEYS = False

    TEMPLATES_AUTO_RELOAD = True

    # --------------------------------------------------
    # Company
    # --------------------------------------------------
    COMPANY_NAME = "Globion Solution Pvt. Ltd."

    COMPANY_EMAIL = "info@globion.in"

    COMPANY_PHONE = "+91XXXXXXXXXX"

    COMPANY_ADDRESS = "West Bengal, India"


class DevelopmentConfig(Config):
    """Development Configuration"""

    DEBUG = True

    SESSION_COOKIE_SECURE = False


class ProductionConfig(Config):
    """Production Configuration"""

    DEBUG = False

    SESSION_COOKIE_SECURE = True


class TestingConfig(Config):
    """Testing Configuration"""

    TESTING = True

    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig
}
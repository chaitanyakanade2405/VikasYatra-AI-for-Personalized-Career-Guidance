from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()  # load .env file

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=os.getenv("SECRET_KEY", "dev")
    )

    CORS(app, origins=os.getenv("ALLOWED_ORIGINS", "*"))

    # Import and register blueprints
    from .routes.health import bp as health_bp
    app.register_blueprint(health_bp, url_prefix="/api/health")

    return app

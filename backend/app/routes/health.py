from flask import Blueprint, jsonify

bp = Blueprint("health", __name__)

@bp.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "message": "VikasYatra backend is running 🚀"
    }), 200

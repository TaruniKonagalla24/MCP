from flask import Blueprint, request, jsonify
from datetime import datetime, timedelta

tracker_bp = Blueprint("tracker", __name__)


def analyze_progress(events):
    if not events:
        return "stagnant", ["Start a new module"]

    recent_events = [
        event for event in events
        if datetime.fromisoformat(event["timestamp"].replace("Z", "+00:00")) >= datetime.utc_now() - timedelta(days=30)
    ]
    completion_count = sum(1 for event in recent_events if event["type"] == "completion")

    if completion_count < 2:
        return "stagnant", ["Take a refresher quiz", "Complete a new module"]
    return "progressing", None


@tracker_bp.route("/update", methods=["POST"])
def update_progress():
    data = request.json
    user_id = data.get("user_id")
    event = data.get("event", {})
    past_events = data.get("past_events", [])

    if not user_id or not event:
        return jsonify({"error": "User ID and event required"}), 400

    try:
        status, alerts = analyze_progress(past_events + [event])
        return jsonify({
            "message": "Progress updated",
            "status": status,
            "alerts": alerts
        }), 200
    except Exception as e:
        return jsonify({"error": f"Failed to update progress: {str(e)}"}), 500
from flask import Blueprint, request, jsonify
from config import azure_client
from datetime import datetime
import json

hackathon_bp = Blueprint("hackathon", __name__)


import re

import re

def generate_challenge(challenge):
    prompt = f"""
    prepare a hackathon problem for the given problem
    Return a JSON object with these fields:
    - title: Challenge title
    - description: Detailed problem statement
    - skills: List of required skills for solving
    - Hints: for solving the problem
    - TestCases: for the problem
    - Badge: that can be awarded if completed only one
    problem: {challenge}
    """
    response = azure_client.chat.completions.create(
        model="MCPGPT",  # Your deployment name
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    print(str(response))
    return json.loads(response.choices[0].message.content.strip("```json\n").strip("\n```"))


@hackathon_bp.route("/setup", methods=["POST"])
def setup_hackathon():
    data = request.json
    title = data.get("title")
    challenge = ""

    try:
        challenge = generate_challenge(title)
        print('atres')
        return jsonify({
            "message": "Hackathon created",
            "description": challenge["description"],
            "title": challenge["title"],
            "skills":challenge["skills"],
            "Hints": challenge["Hints"],
            "TestCases": challenge["TestCases"],
            "Badge": challenge["Badge"]

        }), 201
    except Exception as e:
        setup_hackathon()
        return jsonify({"error": f"Failed to create hackathon: {str(e)}"},challenge), 500



from flask import Blueprint, request, jsonify
from config import azure_client
import json


assessment_bp = Blueprint("assessment", __name__)


@assessment_bp.route("/start", methods=["POST"])
def evaluate_assessment():
    data = request.json
    prompt = data
    response = azure_client.chat.completions.create(
        model="MCPGPT",  # Your deployment name
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    result =  json.loads(response.choices[0].message.content.strip("```json\n").strip("\n```"))


    return jsonify({
        result
    }), 200

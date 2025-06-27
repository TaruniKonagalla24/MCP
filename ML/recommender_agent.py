from flask import Blueprint, request, jsonify
from config import azure_client
import json

recommender_bp = Blueprint("recommender", __name__)


def generate_narrative(data):
    # Detailed prompt for base gpt-4.1 model
    prompt = f"""
    Given a user's skill vectors {json.dumps(data)} ,need a personalized learning path
Recommend learning
modules based on skill gaps. Provide
narrative explanations for
recommended modules in 500  tokens  and please dont start like this Certainly! Here’s a personalized learning path based on the provided skill vectors and available modules, with narrative explanations: because what ur saying is directly fed to system
    """
    response = azure_client.chat.completions.create(
        model="MCPGPT",  # Your deployment name
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=500,
        top_p=0.6,
        frequency_penalty=0.7
    )
    return response.choices[0].message.content


@recommender_bp.route("/recommend", methods=["POST"])
def recommend_learning_path():
    data = request.json


    try:
        narrative = generate_narrative(data)
        return jsonify({
            "narrative": narrative
        }), 200
    except Exception as e:
        return jsonify({"error": f"Failed to generate narrative: {str(e)}"}), 500
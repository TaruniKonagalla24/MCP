from flask import Blueprint, request, jsonify
from config import azure_client
import json
import json
import re


profile_bp = Blueprint("profile", __name__)
import json
import re


import json5

def clean_and_merge_json_blocks(content):
    # Normalize quotes
    content = content.replace("“", '"').replace("”", '"').replace("’", "'")

    # Try extracting the full JSON block inside ```json ... ```
    match = re.search(r"```json\s*(\{.*?\})\s*```", content, re.DOTALL)
    json_str = match.group(1) if match else content.strip()

    try:
        # json5 allows single quotes, trailing commas, unquoted keys, etc.
        parsed = json5.loads(json_str)
        return parsed
    except Exception as e:
        print("❌ JSON5 parsing failed:", e)
        return None



def parse_resume(resume_text):
    print('222222'+resume_text)
    # Detailed prompt for base gpt-4.1 model
    prompt = f"""
    Extract key information from the following resume text. Recommendations is two sentance strings of your suggestion for career advancement
    Return a single valid JSON object with these **exact field names** only:
    - skills
    - experiences
    - Recommendations
    - Progrmming Langauges known

    Use **double quotes** for all field names and values. No comments, no explanation, just raw JSON inside a code block.

    Resume: {resume_text}
    """

    print('5555555555')
    response = azure_client.chat.completions.create(
        model="MCPGPT",  # Your deployment name
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    print('22222223333')
    print(response)
    content = response.choices[0].message.content
    data = clean_and_merge_json_blocks(content)
    print(data)
    # Extract only the JSON part from the markdown

    return data
def normalize_skills(skills_text):
    if isinstance(skills_text, list):
        return skills_text  # Already good
    if isinstance(skills_text, str):
        # Split by semicolon, colon, or commas — then strip whitespace
        parts = re.split(r'[;:,]', skills_text)
        return [p.strip() for p in parts if p.strip()]
    return []

def assess_skills(past_performance, resume_skills):
    performance_weight = 0.6
    resume_weight = 0.4
    skill_scores = {}
    for skill, score in past_performance.items():
        skill_scores[skill] = skill_scores.get(skill, 0) + score * performance_weight
    for skill in resume_skills:
        skill_scores[skill] = skill_scores.get(skill, 0) + 50 * resume_weight
    return skill_scores


@profile_bp.route("/upload_resume", methods=["POST"])
def upload_resume():
    print("RAW DATA:", request.get_data(as_text=True))
    print("JSON:", request.get_json())

    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form  # fallback to form data

        resume_text = data.get("resume_Text")
        print('reseme' + resume_text)
        # exact match to C# casing
        #past_performance = data.get("Past_Performance", {})

        parsed_data = parse_resume(resume_text)
        print(parsed_data)
        #skill_vectors = assess_skills(past_performance, parsed_data["skills"])
        print('back to start')
        return jsonify({
            "Message": str(resume_text),
            "Parsed_Skills": normalize_skills(parsed_data.get("skills", [])),
            "Parsed_Experiences": parsed_data.get("experiences", []),
            "AiRecommendations": parsed_data.get("Recommendations",[]),
            "ProgrmmingLangaugesKnown": parsed_data.get("Progrmming Langauges known", [])
        })

    except Exception as e:
        return jsonify({"error": f"Failed to process resume: {str(e)}"}), 500
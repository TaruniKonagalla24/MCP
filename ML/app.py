from flask import Flask
from profile_agent import profile_bp
from assessment_agent import assessment_bp
from recommender_agent import recommender_bp
from hackathon_agent import hackathon_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(profile_bp, url_prefix="/profile")
app.register_blueprint(assessment_bp, url_prefix="/assessment")
app.register_blueprint(recommender_bp, url_prefix="/recommender")
app.register_blueprint(hackathon_bp, url_prefix="/hackathon")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
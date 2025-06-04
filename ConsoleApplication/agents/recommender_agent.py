from openai import AzureOpenAI


def run_recommender_agent(user_profile: str, assessment_score: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='48a69689cc9b286c')
    prompt = f"""Based on the user profile: {user_profile}
    and score: {assessment_score},
    suggest a personalized learning path with 3 modules and explain why."""

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

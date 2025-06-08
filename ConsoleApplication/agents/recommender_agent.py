from openai import AzureOpenAI


def run_recommender_agent(user_profile: str, assessment_score: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='922892c42af122a9')
    prompt = f"""Based on the user profile: {user_profile}
    and score: {assessment_score},
    suggest a personalized learning path with 3 modules and explain why."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    return response.choices[0].message.content

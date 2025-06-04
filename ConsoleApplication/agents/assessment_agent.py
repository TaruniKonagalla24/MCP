from openai import AzureOpenAI

def run_assessment_agent(user_profile: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='48a69689cc9b286c')
    prompt = f"Given user profile: {user_profile}, generate a score out of 100 and justify."
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

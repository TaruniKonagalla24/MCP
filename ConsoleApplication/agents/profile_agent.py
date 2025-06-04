
from openai import AzureOpenAI
def run_profile_agent(user_input: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='48a69689cc9b286c')
    prompt = f"Extract skills and build user profile from: {user_input}"
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

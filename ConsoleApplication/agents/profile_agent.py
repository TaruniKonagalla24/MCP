
from openai import AzureOpenAI
def run_profile_agent(user_input: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='922892c42af122a9')
    prompt = f"Extract skills and build user profile from: {user_input}"
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    return response.choices[0].message.content

from openai import AzureOpenAI

def run_assessment_agent(user_profile: str):
    client = AzureOpenAI(api_version='2024-06-01',
                         azure_endpoint='https://hexavarsity-secureapi.azurewebsites.net/api/azureai',
                         api_key='922892c42af122a9')
    prompt = f"Given user profile: {user_profile}, generate a score out of 100 and justify."
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0.7,
        max_tokens=2560,
        top_p=0.6,
        frequency_penalty=0.7
    )
    return response.choices[0].message.content

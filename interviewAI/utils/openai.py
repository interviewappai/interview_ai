import openai
from zreo_interviewai.settings import OPENAI_API_KEY
api_key = OPENAI_API_KEY

openai.api_key = api_key


def get_completion(history, user_input=None):
    conversation_history = history
    if user_input:
        conversation_history.append({"role": "user", "content": user_input})
    response = openai.chat.completions.create(
        model="gpt-4",  # Replace with the desired model
        messages=conversation_history
    )
    return response.choices[0].message.content

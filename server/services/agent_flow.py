from groq import Groq
from utils.config import Settings

client = Groq(api_key=Settings.GROQ_API_KEY.value)


def chat_service(question: str):
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {"role": "user", "content": question},
        ],
        temperature=0.2,
    )

    return completion.choices[0].message.content

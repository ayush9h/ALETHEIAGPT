from groq import Groq
from utils.config import Config

client = Groq(api_key=Config.GROQ_API_KEY)


def chatting(question: str):
    completion = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": question}],
        temperature=0.2,
    )

    return completion.choices[0].message.content

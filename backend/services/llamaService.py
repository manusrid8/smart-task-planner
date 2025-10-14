import sys
import json
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Initialize client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)


goal = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "Learn something new"

prompt = f"""
You are an expert AI project planner. Break down this goal into 3-5 actionable tasks.
Each task must have:
- "title": short task name
- "description": what to do
- "estimated_days": integer (1-5)

Goal: "{goal}"

Return ONLY a JSON array like:
[
  {{ "title": "Task 1", "description": "Do something", "estimated_days": 2 }},
  {{ "title": "Task 2", "description": "Next step", "estimated_days": 1 }}
]
"""

try:
    completion = client.chat.completions.create(
        model="meta-llama/llama-4-maverick:free",
        messages=[{"role": "user", "content": prompt}],
    )

    text = completion.choices[0].message.content
    tasks = json.loads(text)
except Exception as e:
    tasks = [{"title": "Manual Task 1", "description": f"Could not generate tasks: {e}", "estimated_days": 1}]

print(json.dumps(tasks))

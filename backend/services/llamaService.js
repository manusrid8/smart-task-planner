// backend/services/llamaService.js
require('dotenv').config();
const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // safer

async function generateTasks(goal) {
  const prompt = `
You are an expert project planner. Break down this goal into 3-5 actionable tasks.
Each task must have:
- "title": short task name
- "description": what to do
- "estimated_days": integer (1–5 days)

Goal: "${goal}"

Return ONLY a JSON array like:
[
  { "title": "Task 1", "description": "Do something", "estimated_days": 2 },
  { "title": "Task 2", "description": "Next step", "estimated_days": 1 }
]
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-4-maverick:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.choices?.length) throw new Error("No choices returned from OpenRouter");

    const text = response.data.choices[0].message.content;
    const jsonMatch = text.match(/\[[\s\S]*\]/); // extract JSON array
    if (!jsonMatch) throw new Error("No JSON array found in AI response");

    return JSON.parse(jsonMatch[0]);

  } catch (err) {
    console.error("❌ OpenRouter request failed:", err.message);
    throw new Error("LLM request failed. Check your API key or network connection.");
  }
}

module.exports = { generateTasks };











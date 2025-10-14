const axios = require("axios");
require("dotenv").config();

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "t5-small";

(async () => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      { inputs: "Write 3 simple tasks for learning JavaScript." },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
        timeout: 20000,
      }
    );
    console.log("Response:", response.data);
  } catch (err) {
    console.error("HF API call failed:", err.message);
  }
})();


//route chatbot.js

const express = require("express");
const OpenAI = require("openai");

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  console.log("✅ Binnenkomende POST /api/chat:", req.body);
  try {
    const { message } = req.body;
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });

    console.log("AI reply:", completion.choices[0].message.content);

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Chatbot fout:", err);
    res.status(500).json({ error: "Er ging iets mis" });
  }
});

module.exports = router; 


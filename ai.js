import express from "express";
import fetch from "node-fetch";
import { HUGGINGFACE_API_KEY } from "./config.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) return res.status(400).json({ error: "No prompt provided" });

  try {
    const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-R1:novita",
        messages: [{ role: "user", content: prompt }],
        stream: false
      })
    });

    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content || "// No output";
    res.json({ output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;
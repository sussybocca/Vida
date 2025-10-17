import express from "express";
const router = express.Router();

// Simple in-memory chat for demo
let chatHistory = [];

router.get("/history", (req, res) => {
  res.json(chatHistory);
});

router.post("/send", (req, res) => {
  const { user, message } = req.body;
  if (!user || !message) return res.status(400).json({ error: "Missing fields" });

  const msg = { user, message, timestamp: Date.now() };
  chatHistory.push(msg);
  res.json({ success: true, msg });
});

export default router;
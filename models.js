import express from "express";
const router = express.Router();

// In-memory storage of user-submitted models (demo)
let userModels = [];

router.get("/all", (req, res) => {
  res.json(userModels);
});

router.post("/upload", (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) return res.status(400).json({ error: "Missing fields" });

  userModels.push({ name, content });
  res.json({ success: true });
});

export default router;
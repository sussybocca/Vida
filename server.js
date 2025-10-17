import express from "express";
import cors from "cors";
import aiRoutes from "./ai.js";
import chatRoutes from "./chat.js";
import modelsRoutes from "./models.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/models", modelsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
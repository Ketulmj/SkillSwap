import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ x: "Hello world" });
});

app.listen(3000, () => console.log("Server at 3000"));

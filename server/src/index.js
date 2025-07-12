import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ x: "Hello world" });
});

app.listen(3000, () => console.log("Server at 3000"));

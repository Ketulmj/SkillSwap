import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ x: 3 });
});
app.listen(3000, () => console.log("Server at 3000"));

import express from "express";
const app = express();
app.get("/server", (req, res) => {
  res.send("server is fine how are you buddy");
});

export { app };

import express from "express";

const app = express();

const PORT = 5000;

const handleListening = () =>
  console.log(`server listening on http://localhost:${PORT}!`);

const home = (req, res) => res.send("home");

app.get(`/`, home);

app.listen(PORT, handleListening);

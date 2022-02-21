import express from "express";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();

const PORT = 5000;

const handleListening = () =>
  console.log(`server listening on http://localhost:${PORT}!`);

const home = (req, res) => res.render("base");
const search = (req, res) => res.send("search");
const login = (req, res) => res.send("login");

app.use(`/videos`, videoRouter);
app.use(`/users`, userRouter);
app.set("views", "src/views");
app.set("view engine", "pug");

app.get(`/`, home);
app.get(`/search`, search);
app.get(`/login`, login);

app.listen(PORT, handleListening);

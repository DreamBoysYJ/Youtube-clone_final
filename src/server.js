import express from "express";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

const PORT = 5000;

const handleListening = () =>
  console.log(`server listening on http://localhost:${PORT}!`);

const home = (req, res) => res.render("home");

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(`/videos`, videoRouter);
app.use(`/users`, userRouter);
app.use(`/`, globalRouter);

app.listen(PORT, handleListening);

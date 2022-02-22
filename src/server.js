import express from "express";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

mongoose.connect("mongodb://127.0.0.1:27017/youtube-final", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("db open");
};

db.once("open", handleOpen);

const app = express();
const logger = morgan("dev");

const PORT = 5000;

const handleListening = () =>
  console.log(`server listening on http://localhost:${PORT}!`);

app.set("views", "src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "HELLO!",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(localsMiddleware);

app.use(`/videos`, videoRouter);
app.use(`/users`, userRouter);
app.use(`/`, globalRouter);

app.listen(PORT, handleListening);

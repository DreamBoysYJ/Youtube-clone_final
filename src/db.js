import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log(`DB CONNECTED`);
const handleError = (error) => console.log(`DB ERROR: `, error);

db.on("error", handleError);
db.once("open", handleOpen);

import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
import { ejecutar } from "./libs/initialSetup.js";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database is connected"))
  .then(() => ejecutar())
  .catch((err) => console.log(err));

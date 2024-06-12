import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoute.js";
import authRoutes from './routes/authRoute.js';
import dotenv from "dotenv";
import { connString } from "./ENV.js";
import cors from 'cors';
dotenv.config();
const app = express();
const port = 3001;
app.use(cors());
mongoose
  .connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e))
  .finally(() => console.log("start"));
  app.use(express.json());
app.use("/api/todo", todoRoutes);
app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Started app, listening on port ${port}`);
});

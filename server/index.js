import express from "express";
import cors from 'cors';
import queueRoutes from './routes/queue.js'
import mongoose from "mongoose";
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(port, () => {
  console.log("listening on port" + `http://localhost:${port}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/SmartQueue")
.then(()=>console.log("connected with database"))
.catch((err)=>console.log(err));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.get("/api", (req, res) => {
  res.status(201).json("landing page");
});
app.use("/api",queueRoutes);

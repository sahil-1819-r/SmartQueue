import express from "express";
import cors from "cors";
import queueRoutes from "./routes/queue.js";
import authRoutes from "./routes/auth.js";
import centralErrorHandler from "./middlewares/centralErrorHandler.js";
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api", (req, res) => {
  res.status(201).json("landing page");
});

app.use("/api", authRoutes);
app.use("/api", queueRoutes);

app.use(centralErrorHandler);
export default app;

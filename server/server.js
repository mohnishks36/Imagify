import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const app = express();

// CORS config
app.use(cors({
  origin: "https://imagify-alpha-hazel.vercel.app/",
  credentials: true,
}));

app.use(express.json());

// DB connection
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use("/api/image", imageRouter);
app.get('/', (req, res) => res.send("API Working"));

// ❌ Remove app.listen()
// ✅ Instead, export app for Vercel
export default app;

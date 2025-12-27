import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";  
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import giphyRoutes from "./routes/giphy.route.js";
import messageRoutes from "./routes/message.route.js";

import { app, server } from "./lib/socket.js"; // ✅ Import WebSocket setup correctly

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// CORS should be handled here
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/giphy", giphyRoutes);


//REVIEW This code tells Express: “In production, serve the built frontend and redirect all unknown routes to index.html so the frontend router works.""
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB();
});
    
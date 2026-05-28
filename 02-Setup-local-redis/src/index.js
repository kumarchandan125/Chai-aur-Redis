import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";

const app = express();
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({ redis: reply });
});

app.get("/mongo", async (req, res) => {
  const Url =
    process.env.MONGO_URL || "mongodb://localhost:27017/chai_aur_redis";
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(Url);
  }
  res.json({ mongo: "connected", database: mongoose.connection.name });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

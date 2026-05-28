import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());


const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const PORT = 3000;

const BANNER_KEY = "app:banner";

app.post("/banner", async (req, res) => {

    await redis.set(BANNER_KEY, req.body.message || "Welcome to chai aur redis!");
    res.json({
        success: true,
        message: "Banner updated successfully"
    })

});


app.get("/banner", async (req, res) => {

    const message = await redis.get(BANNER_KEY);
    res.json({
        message: message
    })

});


app.delete("/banner", async (req, res) => {

    await redis.del(BANNER_KEY);
    res.json({
        success: true,
        message: "Banner deleted successfully"
    })

});


app.get("/banner/exists", async (req, res) => {
    const exists = await redis.exists(BANNER_KEY);
    res.json({
        exists: Boolean(exists)
    })
})

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`)
});
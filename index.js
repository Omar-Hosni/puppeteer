import express from "express";
import cors from "cors";
import screenshotRoute from "./routes/screenshotRoute.js";

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", screenshotRoute);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Screenshot server running on port ${PORT}`);
});

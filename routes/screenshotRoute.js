import express from "express";
import puppeteer from "puppeteer";

const router = express.Router();

router.post("/screenshot", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "Missing url" });
    }

    try {
        console.log("Starting screenshot for URL:", url);

        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-web-security",
                "--disable-features=IsolateOrigins,site-per-process"
            ],
        });

        const page = await browser.newPage();

        // Set viewport for consistent sizing
        await page.setViewport({ width: 1920, height: 1080 });

        console.log("Navigating to URL...");
        await page.goto(url, {
            waitUntil: "networkidle0",
            timeout: 60000
        });

        console.log("Waiting for 3D scene to render...");
        // Wait longer for 3D scene to fully render
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Try to wait for canvas element (Spline renders to canvas)
        try {
            await page.waitForSelector('canvas', { timeout: 10000 });
            console.log("Canvas element found");
        } catch (e) {
            console.warn("Canvas element not found, proceeding anyway");
        }

        console.log("Taking screenshot...");
        const buffer = await page.screenshot({
            type: "png",
            fullPage: false,
        });

        await browser.close();
        console.log("Screenshot complete, sending response");

        res.setHeader("Content-Type", "image/png");
        res.send(buffer);
    } catch (e) {
        console.error("Screenshot error:", e);
        res.status(500).json({ error: e.message });
    }
});

export default router;

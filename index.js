const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());

// home route
app.get("/", (req, res) => {
    res.send("YouTube API is running 👍");
});

// download API
app.get("/download", (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.json({ error: "No URL provided" });
    }

    // yt-dlp command (server side tool)
    exec(`yt-dlp -f mp4 -g "${url}"`, (err, stdout) => {
        if (err) {
            return res.json({ error: "Download failed" });
        }

        res.json({
            download_link: stdout.trim()
        });
    });
});

app.listen(3000, () => {
    console.log("Server running");
});

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // Parse JSON body

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Store API key in .env

// ✅ Proxy Route for YouTube Search
app.get("/api/search", async (req, res) => {
    const query = req.query.query;
    console.log("Searching for: ",query);
    
    if (!query) {
      return res.status(400).json({ error: "Missing query parameter" });
    }
  
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: "snippet",
            q: query,
            key: YOUTUBE_API_KEY,
            type: "video",
            maxResults: 1,
          },
        }
        
      );
  
      if (response.data.items.length > 0) {
        res.json(response.data.items[0]); // Send the first video result
      } else {
        res.status(404).json({ error: "No trailer found" });
      }
    } catch (error) {
      console.error("❌ Error fetching YouTube trailer:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch YouTube trailer", details: error.response?.data || error.message });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const YOUTUBE_API_KEY = "YOUR_NEW_API_KEY"; // 🔥 Replace with new API Key
// const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

// app.get("/api/search", async (req, res) => {
//   try {
//     const { query } = req.query;
//     const response = await axios.get(YOUTUBE_API_URL, {
//       params: {
//         part: "snippet",
//         type: "video",
//         q: `${query} official trailer`,
//         key: YOUTUBE_API_KEY,
//       },
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching YouTube trailer:", error.message);
//     res.status(500).json({ error: "Failed to fetch YouTube trailer" });
//   }
// });

// app.listen(5000, () => console.log("🔥 Server running on port 5000"));

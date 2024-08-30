import OpenAIApi from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5001;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Adjust to your frontend URL
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an instance of OpenAIApi
const openai = new OpenAIApi({
  apiKey: process.env.VITE_OPENAI_API_KEY || "your-api-key-here",
});

// Route to handle prompt-based image generation
app.post("/api/generate-anime-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send("No prompt provided.");
  }

  try {
    // Generate an image using the prompt
    const response = await openai.images.generate({
      model: "dall-e-3", // Replace with the correct model if different
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).send("Error generating image.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

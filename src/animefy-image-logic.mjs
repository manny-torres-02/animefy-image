import OpenAIApi from "openai";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5001;
// app.use(cors());
// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from your Vite frontend
  credentials: true, // If you're dealing with credentials (cookies, HTTP authentication)
  optionSuccessStatus: 200, // Some legacy browsers choke on 204
};

// app.get("/test-cors", (req, res) => {
//   res.json({ message: "CORS is working" });
// });

// app.options("/test-cors", (req, res) => {
//   res.json({ message: "CORS is working" });
//   res.sendStatus(200); // Simple response for OPTIONS request
// });

// app.get("/test-cors", (req, res) => {
//   res.json({ message: "CORS is working" });
// });

app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Configuration is no longer in use

// // Set up OpenAI configuration
// const configuration = new Configuration({
//   apiKey: process.env.VITE_OPENAI_API_KEY,
// });

// Create an instance of OpenAIApi
const openai = new OpenAIApi({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route to handle image upload and processing
app.post(
  "/api/generate-anime-image",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = path.join(uploadDir, req.file.filename);
    console.log(`File uploaded to: ${filePath}`);

    try {
      // Verify that the file exists before attempting to read it
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Read the image file as a buffer
      const imageBuffer = fs.readFileSync(filePath);
      console.log(`File read successfully: ${filePath}`);

      // Example of sending the image to an animefication API
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Anime-style rendering of the uploaded image",
        n: 1,
        size: "1024x1024",
        image: imageBuffer,
      });

      const imageUrl = response.data[0].url;
      res.json({ imageUrl });

      // Optionally delete the uploaded file after processing
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    } catch (error) {
      console.error("Error processing image:", error.message);
      res.status(500).send("Error processing image.");
    }
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

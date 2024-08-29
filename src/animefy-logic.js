const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

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
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(__dirname, "uploads", req.file.filename);

  try {
    // Example of sending the image to an animefication API
    const response = await axios.post(
      "YOUR_ANIMEFY_API_URL",
      {
        data: fs.createReadStream(filePath),
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // Send back the processed image URL or data
    res.json({ imageUrl: response.data.imageUrl });

    // Optionally, delete the uploaded file after processing
    fs.unlinkSync(filePath);
  } catch (error) {
    res.status(500).send("Error processing image.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

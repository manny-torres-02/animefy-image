// Imports
import React, { useState } from "react";
import axios from "axios"; // axios will make the HTTP request to the backend

// Create the functional component - TypeScript will infer the type of the props
const UploadImage: React.FC = () => {
  // Create a state to handle the image file
  const [file, setFile] = useState<File | null>(null);
  // State to handle the animefied image
  const [animefiedImage, setAnimefiedImage] = useState<string | null>(null);
  // Create a loading state to show the user that the image is being processed
  const [loading, setLoading] = useState<boolean>(false);
  // Create a state to handle the error message
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAnimefiedImage(response.data.imageUrl);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Animefy Your Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ marginBottom: "10px" }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        {loading ? "Processing..." : "Animefy"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {animefiedImage && (
        <div>
          <h2>Animefied Image:</h2>
          <img
            src={animefiedImage}
            alt="Animefied"
            style={{ marginTop: "20px", maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;

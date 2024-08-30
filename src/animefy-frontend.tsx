// Imports
import React, { useState } from "react";
import axios from "axios"; // axios will make the HTTP request to the backend

// Create the functional component - TypeScript will infer the type of the props
const AnimefyComponent: React.FC = () => {
  // Create a state to handle the image file
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // State to handle animefied image
  const [file, setFile] = useState<File | null>(null);
  // Create a loading state to show the user that the image is being processed
  const [loading, setLoading] = useState<boolean>(false);
  // Create a state to handle the error message
  const [error, setError] = useState<string | null>(null);
  // Create a state to handle the prompt
  const [prompt, setPrompt] = useState<string>("");

  /********** handle the prompt *********** */
  const handleSubmit = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ imageUrl: string }>(
        "http://localhost:5001/api/generate-anime-image",
        {
          prompt,
        }
      );

      setImageUrl(response.data.imageUrl);
    } catch (err) {
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  /****** IMAGE UPLOAD  *******/
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };
  // Handle file selection
  // const generateAnimeImage = async () => {
  //   if (!file) return;
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const formData = new FormData();
  //     formData.append("model", "dall-e-3");
  //     formData.append("image", file);

  //     // Since you are sending the image via FormData, you can include other fields like "prompt", "n", and "size" in the FormData itself.
  //     formData.append("prompt", "Anime-style image prompt here");
  //     formData.append("n", "1");
  //     formData.append("size", "1024x1024");

  //     const response = await axios.post(
  //       "http://localhost:5001/api/generate-anime-image",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //         },
  //       }
  //     );

  //     // setImageUrl(response.data.data[0].url);
  //     setImageUrl(response.data.url);
  //   } catch (error) {
  //     setError("Failed to generate image");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     const response = await axios.post(
  //       "http://localhost:5001/api/generate-anime-image",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setImageUrl(response.data.url);
  //   } catch (error) {
  //     setError("Failed to generate image");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      {/* prompt */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Anime Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated Anime"
          style={{ marginTop: "20px", maxWidth: "100%" }}
        />
      )}
      {/* image upload */}
      {/* <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={generateAnimeImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Anime Image"}
      </button>
      {error && <p>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated Anime" />} */}
    </div>
  );
};

export default AnimefyComponent;

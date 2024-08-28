// Imports
import React, { useState } from "react";
import axios from "axios"; // axios will make the HTTP request to the back end

// create the functional component - typescript will infer the type of the props
const uploadImage: React.FC = () => {
  // create a state to handle the image file
  const [file, setFile] = useState<File | null>(null);
  // state to handle the anime image
  const [animefiedImage, setAnimeifiedImage] = useState<string | null>(null);
  // create a loading state to show the user that the image is being processed
  const [loading, setLoading] = useState<boolean>(false);
  // create a state to handle the error message
  const [error, setError] = useState<string | null>(null);

  const;

  return (
    <div>
      <h1>Animefy your image!! </h1>
      <input type="file" onChange={(e) => setFile(e.target.files![0])} />
    </div>
  );
};

export default uploadImage;

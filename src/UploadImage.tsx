// Imports
import React, { useState } from "react";
import axios from "axios"; // axios will make the HTTP request to the back end

// create the functional component - typescript will infer the type of the props
const uploadImage: React.FC = () => {
  // create a state to handle the image file
  const [file, setFile] = useState<File | null>(null);
  // state to handle the anime image
  const [animefiedImage, setAnimeifiedImage] = useState<string | null>(null);

  return <div> </div>;
};

export default uploadImage;

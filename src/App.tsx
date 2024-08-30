import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import UploadImage from "./animefy-frontend";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Animefy your image! </h1>
        <UploadImage />
      </div>
    </>
  );
}

export default App;

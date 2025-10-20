import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [apiStatus, setApiStatus] = useState("Connecting...");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health")
      .then((res) => {
        setApiStatus(`${res.data.message}`);
      })
      .catch((err) => {
        setApiStatus("❌ Failed to connect to backend");
        console.error(err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>VikasYatra Frontend</h1>
      <p>{apiStatus}</p>
    </div>
  );
}

export default App;


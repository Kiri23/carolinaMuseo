import React from "react";
import ReactDOM from "react-dom/client";

function SimpleApp() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>Hello from GitHub Pages!</h1>
      <p>If you can see this, your React app is working correctly.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>
);

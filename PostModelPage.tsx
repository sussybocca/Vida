import React from "react";
import ModelUploader from "./ModelUploader.jsx";

export default function PostModelPage() {
  return (
    <div style={{ padding: "10px" }}>
      <h2>Post Your AI Model</h2>
      <ModelUploader />
    </div>
  );
}
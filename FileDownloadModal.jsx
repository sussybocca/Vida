import React from "react";

export default function FileDownloadModal({ file }) {
  if (!file) return null;

  const download = () => {
    const blob = new Blob([file.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
  };

  return <button className="download-btn" onClick={download}>Download {file.name}</button>;
}
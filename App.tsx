import React, { useState } from "react";
import Terminal from "./Terminal.jsx";
import PostModelPage from "./PostModelPage.tsx";
import BrowseModelsPage from "./BrowseModelsPage.tsx";

export default function App() {
  const [page, setPage] = useState<"terminal"|"post"|"browse">("terminal");

  return (
    <div>
      <nav style={{ padding: "10px", background: "#222" }}>
        <button onClick={() => setPage("terminal")}>Terminal</button>
        <button onClick={() => setPage("post")}>Post Model</button>
        <button onClick={() => setPage("browse")}>Browse Models</button>
      </nav>
      <main>
        {page === "terminal" && <Terminal />}
        {page === "post" && <PostModelPage />}
        {page === "browse" && <BrowseModelsPage />}
      </main>
    </div>
  );
}
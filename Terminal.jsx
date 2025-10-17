import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput.jsx";
import FileDownloadModal from "./FileDownloadModal.jsx";

export default function Terminal() {
  const [messages, setMessages] = useState([]);
  const [generatedFile, setGeneratedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendPrompt = async (prompt) => {
    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      const fullOutput = data.output || "// No output";

      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullOutput.length) {
          setMessages(prev => [
            ...prev.filter(m => m.role !== "via-temp"),
            { role: "via-temp", content: fullOutput.slice(0, i) }
          ]);
          i++;
        } else {
          clearInterval(interval);
          setMessages(prev => [
            ...prev.filter(m => m.role !== "via-temp"),
            { role: "via", content: fullOutput }
          ]);
          setGeneratedFile({ name: "generatedCode.js", content: fullOutput });
        }
      }, 20);
    } catch (err) {
      setMessages(prev => [...prev, { role: "via", content: "// Error generating code" }]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!generatedFile) return;
    const blob = new Blob([generatedFile.content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = generatedFile.name;
    link.click();
  };

  return (
    <div style={{ padding: "10px" }}>
      <div ref={terminalRef} className="terminal">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role.startsWith("via") ? "via" : "user"}>
            <strong>{msg.role.startsWith("via") ? "Via" : "You"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="via">Via is typing...</div>}
      </div>
      <ChatInput onSend={sendPrompt} />
      {generatedFile && (
        <button className="download-btn" onClick={downloadFile}>
          Download {generatedFile.name}
        </button>
      )}
    </div>
  );
}
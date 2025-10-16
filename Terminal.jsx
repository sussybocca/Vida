import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput.jsx";
import FileDownloadModal from "./FileDownloadModal.jsx";

export default function Terminal() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("vidaChatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [generatedFile, setGeneratedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    localStorage.setItem("vidaChatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendPrompt = async (prompt) => {
    setMessages(prev => [...prev, { role: "user", content: prompt }]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const data = await response.json();
      const fullOutput = data?.generated_text || "// No output";

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

  return (
    <div className="flex flex-col h-screen p-4 max-w-md mx-auto bg-gray-900">
      <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 rounded-lg bg-black shadow-inner mb-2 terminal-window">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role.startsWith("via") ? "text-green-400" : "text-white"}`}>
            <span className="font-bold">{msg.role.startsWith("via") ? "Via" : "You"}: </span>
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <div className="text-green-400 italic">Via is typing...</div>}
      </div>
      <ChatInput onSend={sendPrompt} />
      {generatedFile && <FileDownloadModal file={generatedFile} />}
    </div>
  );
}
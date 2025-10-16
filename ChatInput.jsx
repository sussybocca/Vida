import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center">
      <span className="text-green-400 mr-2 font-bold">></span>
      <input
        type="text"
        className="flex-1 p-2 rounded-l bg-gray-800 text-white outline-none"
        placeholder="Ask Via to generate code..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-green-500 text-black px-4 rounded-r hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
}
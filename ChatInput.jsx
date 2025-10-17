import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="input-line">
      <span>&gt;</span>
      <input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
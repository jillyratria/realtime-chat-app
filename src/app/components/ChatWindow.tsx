"use client";

import { useState } from "react";

export type Sender = "left" | "right";
export type Message = {
  id: string;
  content: string;
  sender: Sender;
  timestamp: number;
};

export type ChatWindowProps = {
  messages: Message[];
  sender: Sender;
  isFlashing: boolean;
  onSendMessage: (content: string, sender: Sender) => void;
  accentColor: "blue" | "green";
};

type ColorClass = {
  [key: string]: string;
};

export function ChatWindow(props: ChatWindowProps) {
  const { messages, isFlashing, onSendMessage, accentColor, sender } = props;
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(message, sender);
    setMessage("");
  };

  const colorClass: ColorClass = {
    blue: "bg-blue-100",
    green: "bg-green-100",
  };

  return (
    <div
      className={`flex-1 flex flex-col bg-white rounded-lg shadow-lg p-4 
    ${isFlashing ? "animate-flash" : ""}`}
    >
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded-lg max-w-[80%] 
          ${
            msg.sender === sender
              ? `${colorClass[accentColor]} text-white ml-auto`
              : "bg-gray-200 text-gray-800"
          }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className={`px-4 py-2 ${colorClass[accentColor]} text-white rounded-lg`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

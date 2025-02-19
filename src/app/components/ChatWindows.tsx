"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { ChatWindow } from "./ChatWindow";
import type { Message, Sender } from "./ChatWindow";

let socket: Socket;

export function ChatWindows() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [rightFlash, setRightFlash] = useState(false);
  const [leftFlash, setLeftFlash] = useState(false);

  useEffect(() => {
    socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    console.log("socket", socket.listeners);

    socket.on("receive_message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      if (message.sender === "left") {
        setRightFlash(true);
        setTimeout(() => setRightFlash(false), 500);
      } else {
        setLeftFlash(true);
        setTimeout(() => setLeftFlash(false), 500);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSendMessage = (content: string, sender: Sender) => {
    const message: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: Date.now(),
    };

    socket.emit("send_message", message);
  };

  return (
    <main>
      <div className="flex h-full gap-4 bg-gray-100">
        <ChatWindow
          messages={messages}
          sender="left"
          isFlashing={leftFlash}
          onSendMessage={(content, sender) => {
            onSendMessage(content, sender);
          }}
          accentColor="blue"
        />
        <ChatWindow
          messages={messages}
          sender="right"
          isFlashing={rightFlash}
          onSendMessage={(content, sender) => {
            onSendMessage(content, sender);
          }}
          accentColor="green"
        />
      </div>
    </main>
  );
}

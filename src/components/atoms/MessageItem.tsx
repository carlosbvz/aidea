import React from "react";

export type MessageType = {
  role: string;
  content: string;
};

export default function MessageItem({ role, content }: MessageType) {
  return (
    <div
      className={`rounded-lg shadow-md p-6 mb-4 ${
        role === "user" ? "bg-green-800 text-white" : "bg-gray-900 text-white"
      }`}
    >
      {content}
    </div>
  );
}

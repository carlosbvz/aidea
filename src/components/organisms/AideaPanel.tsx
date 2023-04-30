"use client";

import AideaForm from "@molecules/AideaForm";
import { useState } from "react";
import AiService from "@/services/AiService";
import ErrorType from "@models/Error";

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "";
const aiService = new AiService(AI_API_URL, ErrorType);

function getRowAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return [
    `Business Candidate: ${question}`,
    `It's a business proposal?: ${answer}`,
  ];
}

const contactAI = async (prompt: string) => {
  const response = await aiService.getAiResponse(prompt);
  return response;
};

function AideaPanel() {
  const [title, setTitle] = useState<string>(
    "Let's Discuss, tell me your idea"
  );
  const [userData, setUserData] = useState<string[]>([]);

  const handleOnSubmit = async (data: string) => {
    const response = await contactAI(data);
    // setTitle(`Follow up question #: ${userData.length + 1}`);
    const booleanResponse =
      response.includes("True") || response.includes("true");
    const rowAnswer = getRowAnswer({
      question: data,
      answer: String(booleanResponse),
    });
    setUserData((prev) => [...prev, ...rowAnswer]);
  };

  return (
    <>
      <AideaForm title={title} onSubmit={handleOnSubmit} />
      <div className="mt-8">
        {userData.map((prompt, index) => (
          <p key={index}>{prompt}</p>
        ))}
      </div>
    </>
  );
}

export default AideaPanel;

"use client";

import AideaForm from "@molecules/AideaForm";
import { useState } from "react";
import AiService from "@/services/AiService";
import ErrorType from "@models/Error";

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "";
const aiService = new AiService(AI_API_URL, ErrorType);

const contactAI = async (prompt: string) => {
  const response = await aiService.getAiResponse(prompt);
  return response;
};

function AideaPanel() {
  const [title, setTitle] = useState<string>(
    "Let's Discuss, tell me your ideas"
  );
  const [userData, setUserData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnSubmit = async (data: string) => {
    setIsLoading(true);
    const response = await contactAI(data);
    // setTitle(`Follow up question #: ${userData.length + 1}`);

    setUserData((prev: any) => [
      ...prev,
      {
        question: data,
        answer: response,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <>
      <AideaForm
        title={title}
        onSubmit={handleOnSubmit}
        isLoading={isLoading}
      />
      <div className="mt-8">
        {userData.map(
          (prompt: { question: string; answer: string }, index: number) => (
            <div
              key={index}
              className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4"
            >
              <div className="text-xl font-bold">{prompt.question}</div>
              <div className="text-lg rounded-lg bg-gray-700 mt-3 p-3">
                {prompt.answer}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default AideaPanel;

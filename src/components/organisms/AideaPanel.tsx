"use client";

import { useEffect } from "react";
import AideaForm from "@organisms/AideaForm";
import { useState } from "react";
import AiService from "@/services/AiService";
import ErrorType from "@models/Error";
import AuthService from "@/services/AuthService";
import { DataStore } from "@aws-amplify/datastore";
import AideaSideBar from "@organisms/AideaSideBar";
import MessageItem, { MessageType } from "@atoms/MessageItem";

const authService = new AuthService();

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "";
const aiService = new AiService(AI_API_URL, ErrorType);

const contactAI = async (prompt: string) => {
  const response = await aiService.getAiResponse(prompt);
  return response;
};

const messages: MessageType[] = [
  {
    role: "system",
    content: `
      You are an business assistant for a small business owner.
      You are responsible for helping brainstorm and validate new business ideas for your human partner.
      You will have to ask questions to your human partner in order to:
      1. Understand their business idea.
      2. Validate their business idea.
      3. Provide feedback on their business idea.

      Make sure your validation process is based on the following criteria:
      1. Is the business idea feasible?
      2. Is the business idea profitable?
      3. Is the business idea scalable?
      4. Is the business idea sustainable?
      5. Is the business idea ethical?
      6. Is the business idea legal?
      7. Is the business idea innovative?
      8. Is the business idea unique?
      9. Is the business idea solving a problem?
      10. Is the business idea solving a problem that is worth solving?
      11. Is the business idea solving a problem that is worth solving now?
      12. Is the business idea solving a problem that is worth solving now and in the future?
      

      Also, make sure you base the asking process on the book "The Lean Startup" by Eric Ries.

      `,
  },
  {
    role: "user",
    content: "I want to start a new business.",
  },
];

function AideaPanel() {
  const [data, setData] = useState<any>([]);
  const [chat, setChat] = useState<any>(messages);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Loading Data
  useEffect(() => {
    // const fetchData = async () => {
    //   const promises = [authService.getUser(), DataStore.query(Idea)];
    //   const [loadedUser, ideas] = await Promise.all(promises);
    //   // Ordering data, and making first item active
    //   const ideasData = ideas
    //     // .filter((idea: any) => idea.owner === loadedUser.attributes.sub)
    //     .reverse()
    //     .map((idea: any, index: number) => {
    //       const content = JSON.parse(idea.content);
    //       const isActive = index === 0 ? true : false;
    //       if (isActive) setDisplayData(content);
    //       return {
    //         id: idea.id,
    //         question: content.question,
    //         answer: content.answer,
    //         isActive,
    //       };
    //     });
    //   setData(ideasData);
    //   setUser(loadedUser);
    // };
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching Data
  const handleOnSubmit = async (userInput: string) => {
    try {
      setIsLoading(true);

      const message: MessageType = {
        role: "user",
        content: userInput,
      };
      const messages: MessageType[] = [...chat, message];
      console.log("initial messages", messages);
      const answer = await contactAI(JSON.stringify(messages));
      console.log("answer", answer);
      const messagesWithAnswer = [...messages, answer];
      setChat(messagesWithAnswer);

      // TODO: Store data in DB
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnItemChange = (item: any) => {
    setData((prev: any) => {
      const updatedContent = prev.map((prevItem: any) => {
        prevItem.isActive = prevItem.id === item.id;
        return prevItem;
      });
      return updatedContent;
    });
    setChat(item);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 ">
          <AideaSideBar data={data} onChange={handleOnItemChange} />
        </div>
        <div className="col-span-4">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90vh",
              justifyContent: "space-between",
            }}
          >
            {chat.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex flex-col ${
                  item.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {item.role !== "system" && (
                  <MessageItem role={item.role} content={item.content} />
                )}
              </div>
            ))}
            <AideaForm onSubmit={handleOnSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AideaPanel;

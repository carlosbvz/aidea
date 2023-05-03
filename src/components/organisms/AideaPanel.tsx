"use client";

import { useEffect } from "react";
import AideaForm from "@organisms/AideaForm";
import { useState } from "react";
import AiService from "@/services/AiService";
import ErrorType from "@models/Error";
import AuthService from "@/services/AuthService";
import { DataStore } from "@aws-amplify/datastore";
import AideaSideBar from "@organisms/AideaSideBar";
import { Idea } from "../../models";

const authService = new AuthService();

const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "";
const aiService = new AiService(AI_API_URL, ErrorType);

const contactAI = async (prompt: string) => {
  const response = await aiService.getAiResponse(prompt);
  return response;
};

function AideaPanel() {
  const [title, setTitle] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Loading Data
  useEffect(() => {
    const fetchData = async () => {
      const promises = [authService.getUser(), DataStore.query(Idea)];
      const [loadedUser, ideas] = await Promise.all(promises);

      // Ordering data, and making first item active
      const ideasData = ideas
        // .filter((idea: any) => idea.owner === loadedUser.attributes.sub)
        .reverse()
        .map((idea: any, index: number) => {
          const content = JSON.parse(idea.content);
          const isActive = index === 0 ? true : false;
          if (isActive) setDisplayData(content);
          return {
            id: idea.id,
            question: content.question,
            answer: content.answer,
            isActive,
          };
        });

      setData(ideasData);
      setUser(loadedUser);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching Data
  const handleOnSubmit = async (question: string) => {
    try {
      setIsLoading(true);
      const answer = await contactAI(question);

      const content = {
        question,
        answer,
        isActive: true,
      };

      await DataStore.save(
        new Idea({
          content: JSON.stringify(content),
          owner: user.id,
          user: user,
        })
      );

      setData((prev: any) => {
        const updatedContent = prev.map((item: any) => {
          item.isActive = false;
          return item;
        });
        return [content, ...updatedContent];
      });
      setDisplayData(content);
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
    setDisplayData(item);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 ">
          <AideaSideBar data={data} onChange={handleOnItemChange} />
        </div>
        <div className="col-span-4">
          <div>
            <AideaForm
              title={title}
              onSubmit={handleOnSubmit}
              isLoading={isLoading}
            />
            {displayData && (
              <>
                <div className="mt-4 text-lg font-bold">
                  {displayData.question}
                </div>
                <div className="mt-4 text-lg font-bold">
                  {displayData.answer}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AideaPanel;

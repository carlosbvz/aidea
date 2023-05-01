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
  const [userData, setUserData] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Loading Data
  useEffect(() => {
    const fetchData = async () => {
      const promises = [authService.getUser(), DataStore.query(Idea)];
      const [loadedUser, ideas] = await Promise.all(promises);

      const ideasData = ideas
        // .filter((idea: any) => idea.owner !== loadedUser.attributes.sub)
        .map((idea: any) => JSON.parse(idea.content))
        .reverse();
      setUserData(ideasData);
      setUser(loadedUser);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching Data
  const handleOnSubmit = async (data: string) => {
    try {
      setIsLoading(true);
      const response = await contactAI(data);

      const content = {
        question: data,
        answer: response,
      };

      await DataStore.save(
        new Idea({
          content: JSON.stringify(content),
          owner: user.id,
          user: user,
        })
      );

      setUserData((prev: any) => [content, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 ">
          <AideaSideBar data={userData} />
        </div>
        <div className="col-span-4">
          <AideaForm
            title={title}
            onSubmit={handleOnSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default AideaPanel;

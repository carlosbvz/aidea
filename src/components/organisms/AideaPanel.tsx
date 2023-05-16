"use client";

import { useEffect } from "react";
import AideaForm from "@organisms/AideaForm";
import { useState } from "react";
import AiService from "@/services/AiService";
import ErrorType from "@models/Error";
import AuthService from "@/services/AuthService";
import AideaSideBar from "@/components/organisms/sideBar/sideBar";
import MessageItem, { MessageType } from "@atoms/MessageItem";
import { evaMessages } from "@utils/messages";

import { API } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  CreateChatInput,
  CreateChatMutation,
  ListChatsQuery,
  UpdateChatInput,
  UpdateChatMutation,
} from "../../API";
import { initialize } from "next/dist/server/lib/render-server";

const authService = new AuthService();
const AI_API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "";
const aiService = new AiService(AI_API_URL, ErrorType);
const contactAI = async (prompt: string) => {
  const response = await aiService.getAiResponse(prompt);
  return response;
};
const loadInitialData = async () => {
  const promises = [
    authService.getUser(),
    API.graphql<GraphQLQuery<ListChatsQuery>>({
      query: queries.listChats,
    }),
  ];

  const [loadedUser, chatsData] = await Promise.all(promises);
  const chatsItems = chatsData?.data?.listChats?.items;
  const areThereChats = chatsItems?.length > 0;

  let chats;
  let activeChat;

  // Existing Chats
  if (areThereChats) {
    chats = chatsItems.map((chat: any) => {
      const messages = JSON.parse(chat.messages);
      return {
        ...chat,
        messages,
      };
    });
    // New Chat
  } else {
    activeChat = {
      messages: evaMessages,
    };
  }

  return { chats, activeChat };
};
const createNewChat = async (messages: MessageType[]) => {
  const chatDetails: CreateChatInput = {
    messages: JSON.stringify(messages),
  };

  const newChat = await API.graphql<GraphQLQuery<CreateChatMutation>>({
    query: mutations.createChat,
    variables: { input: chatDetails },
  });

  return newChat?.data?.createChat;
};

function AideaPanel() {
  const [chats, setChats] = useState<any>([]);
  const [activeChat, setActiveChat] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [botInstructions, setBotInstructions] = useState<string>(
    evaMessages[0].content
  );

  // Loading Data
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        const { chats, activeChat } = await loadInitialData();
        setChats(chats);
        setActiveChat(activeChat);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  // Fetching Data
  const handleOnSubmit = async (userInput: string) => {
    try {
      setIsLoading(true);

      const allMessages = [...activeChat.messages];
      const userMessage: MessageType = {
        role: "user",
        content: userInput,
      };
      const messagesWithUserMessage: MessageType[] = [
        ...allMessages,
        userMessage,
      ];

      // Update UI with user's message
      setActiveChat({
        ...activeChat,
        messages: messagesWithUserMessage,
      });

      // Get AI's response
      const answer = await contactAI(JSON.stringify(messagesWithUserMessage));
      const messagesWithAnswer = [...messagesWithUserMessage, answer];

      setActiveChat({
        ...activeChat,
        messages: messagesWithAnswer,
      });

      // const chatDetails: UpdateChatInput = {
      //   id: activeChat.id,
      //   _version: activeChat._version,
      //   messages: JSON.stringify(messagesWithAnswer),
      // };

      // const updatedChat = await API.graphql<GraphQLQuery<UpdateChatMutation>>({
      //   query: mutations.updateChat,
      //   variables: { input: chatDetails },
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnItemChange = (item: any) => {
    console.log("Item: ", item);
  };

  const handleOnBotDescriptionChange = (event: any) => {
    const text = event.target.value;
    setBotInstructions(text);
    activeChat.messages[0].content = text;
    setActiveChat(activeChat);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 ">
          {/* <button
            className={`bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline mt-2 disabled:opacity-50 disabled:cursor-not-allowed `}
          >
            New
          </button> */}
          {/* <AideaSideBar data={activeChat} onChange={handleOnItemChange} /> */}
          <p>Bot requirements:</p>
          <textarea
            className="form-input rounded-lg px-3 py-2 resize-none h-auto  dark:bg-gray-600 bg-gray-600"
            name="title"
            value={botInstructions}
            onChange={handleOnBotDescriptionChange}
            cols={30}
            rows={30}
          />
        </div>
        <div className="col-span-4 mb-4">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80vh",
              justifyContent: "space-between",
            }}
          >
            {activeChat?.messages?.map?.((item: any, index: number) => (
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

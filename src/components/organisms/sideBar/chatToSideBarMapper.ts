import { DataType } from "./sideBar";

function chatToSideBarMapper(chat: any): DataType {
  const { id, name, image, lastMessage } = chat;
  return [
    {
      text: "text",
      isActive: false,
    },
  ];
}

export { chatToSideBarMapper };

import React from "react";
import SideBarItem from "@atoms/SideBarItem";

type Props = {
  data: any;
};

export default function AideaSideBar({ data }: Props) {
  return (
    <div>
      {data.map(
        (prompt: { question: string; answer: string }, index: number) => (
          <SideBarItem key={index} text={prompt.question} isActive={true} />
        )
      )}
    </div>
  );
}

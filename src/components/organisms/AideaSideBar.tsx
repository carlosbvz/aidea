import React from "react";
import SideBarItem from "@atoms/SideBarItem";

type ItemType = {
  question: string;
  isActive?: boolean;
};
type Props = {
  data: any;
  onChange?: (item: any) => void;
};

export default function AideaSideBar({ data, onChange }: Props) {
  const handleOnChange = (item: any) => {
    onChange?.(item);
  };

  return (
    <div>
      {data.map((item: ItemType, index: number) => (
        <div key={index} onClick={() => handleOnChange(item)}>
          <SideBarItem text={item.question} isActive={item.isActive} />
        </div>
      ))}
    </div>
  );
}

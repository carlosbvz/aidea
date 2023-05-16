import React from "react";
import SideBarItem from "@atoms/SideBarItem";

type ItemType = {
  text: string;
  isActive?: boolean;
};
type DataType = ItemType[];
type Props = {
  data: DataType;
  onChange?: (item: any) => void;
};

export default function AideaSideBar({ data, onChange }: Props) {
  const handleOnChange = (item: any) => {
    onChange?.(item);
  };

  // console.log("data", data);

  return (
    <div
      style={{
        height: "90vh",
        overflow: "scroll",
      }}
    >
      {data?.map?.((item: ItemType, index: number) => (
        <div key={index} onClick={() => handleOnChange(item)}>
          <SideBarItem text={item.text} isActive={item.isActive} />
        </div>
      ))}
    </div>
  );
}

export type { DataType };

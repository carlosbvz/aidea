import React from "react";

type Props = {
  text: string;
  isActive?: boolean;
};

const maxTextLength = 25;

export default function SideBarItem({ text, isActive }: Props) {
  const truncatedText =
    text?.length > maxTextLength
      ? text.substring(0, maxTextLength) + "..."
      : text;
  const baseClasses =
    "p-6 mb-4 rounded-lg hover:bg-gray-600 hover:shadow-md hover:dark:bg-gray-600 cursor-pointer";
  const activeClasses =
    isActive && "bg-gray-600 dark:bg-gray-600 rounded-lg shadow-md";
  const classes = `${baseClasses} ${activeClasses}`;

  return (
    <div className={classes}>
      <div className="text-sm font-bold">{`-> ${truncatedText}`}</div>
    </div>
  );
}

import React from "react";

type Props = {
  title: string;
  text: string;
};

export default function CardItem({ title, text }: Props) {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="text-xl font-bold">{title}</div>
      <div className="text-lg rounded-lg bg-gray-700 mt-3 p-3">{text}</div>
    </div>
  );
}

"use client";

import { useState } from "react";
import TextArea from "@molecules/TextArea";

interface AideaFormType {
  title: string;
  isLoading: boolean;
  onSubmit: (data: string) => void;
}

const AideaForm = ({ title, onSubmit, isLoading }: AideaFormType) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!userInput) return;
    setUserInput("");
    onSubmit(userInput);
  };

  return (
    <form>
      <h1 className="text-3xl font-bold">{title}</h1>
      <TextArea
        name="title"
        value={userInput}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />

      <div className="flex flex-row justify-end items-end mt-2">
        <button
          type="submit"
          className={`bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline mt-2 disabled:opacity-50 disabled:cursor-not-allowed `}
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AideaForm;

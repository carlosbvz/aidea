"use client";

import { useState } from "react";
import TextArea from "@molecules/TextArea";

interface AideaFormType {
  title: string;
  onSubmit: (data: string) => void;
}

const AideaForm = ({ title, onSubmit }: AideaFormType) => {
  const [userInput, setUserInput] = useState("");

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
      <h1 className="text-3xl font-bold mb-5">{title}</h1>
      <TextArea name="title" value={userInput} onChange={handleOnChange} />

      <div className="flex flex-row justify-end items-end mt-2">
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline mt-2"
          onClick={handleOnSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AideaForm;

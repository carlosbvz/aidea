"use client";

import { useState } from "react";

interface InputType {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInput = ({ name, value, onChange }: InputType) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        className="form-input border rounded px-3 py-2 resize-none h-auto"
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        rows={7}
      />
    </div>
  );
};

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
      <TextInput name="title" value={userInput} onChange={handleOnChange} />
      <button
        type="submit"
        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline mt-2"
        onClick={handleOnSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default AideaForm;

"use client";

import AideaForm from "@molecules/AideaForm";
import { useState } from "react";

function AideaPanel() {
  const [title, setTitle] = useState<string>(
    "Let's Discuss, tell me your idea"
  );
  const [userData, setUserData] = useState<string[]>([]);

  const handleOnSubmit = (data: string) => {
    setTitle(`Follow up question #: ${userData.length + 1}`);
    setUserData((prev) => [...prev, data]);
  };

  return (
    <>
      <AideaForm title={title} onSubmit={handleOnSubmit} />
      <div className="mt-8">
        {userData.map((prompt, index) => (
          <p key={index}>{prompt}</p>
        ))}
      </div>
    </>
  );
}

export default AideaPanel;

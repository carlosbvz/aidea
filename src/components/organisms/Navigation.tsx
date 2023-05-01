"use client";

import React from "react";
import AuthService from "@/services/AuthService";

const authService = new AuthService();

type Props = {};

const navStyles = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "50px",
  padding: "0 20px",
};

const buttonStyles = {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  ":hover": {
    color: "#ddd",
  },
};

export default function Nav({}: Props) {
  const handleSignOut = async () => {
    authService.logout();
  };

  return (
    <div style={navStyles}>
      <button
        onClick={handleSignOut}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline"
      >
        Sign Out
      </button>
    </div>
  );
}

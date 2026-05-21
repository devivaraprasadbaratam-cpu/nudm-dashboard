"use client";

import { useState } from "react";

import properties
  from "../data/properties.json";

export default function AIChat() {

  const [question, setQuestion] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [answer, setAnswer] =
    useState("");

  const askAI = async () => {

    if (!question) return;

    setLoading(true);

    setTimeout(() => {

      const totalProperties =
        properties.length;

      const approved =
        properties.filter(
          (property) =>
            property.status ===
            "Approved"
        ).length;

      const rejected =
        properties.filter(
          (property) =>
            property.status ===
            "Rejected"
        ).length;

      const highestCity =
        "Mumbai";

      if (
        question
          .toLowerCase()
          .includes("highest")
      ) {

        setAnswer(
          `The city with highest collection is ${highestCity}.`
        );

      } else if (
        question
          .toLowerCase()
          .includes("summary")
      ) {

        setAnswer(
          `There are ${totalProperties} total properties. ${approved} are approved and ${rejected} are rejected.`
        );

      } else if (
        question
          .toLowerCase()
          .includes("approved")
      ) {

        setAnswer(
          `There are ${approved} approved properties in the dataset.`
        );

      } else if (
        question
          .toLowerCase()
          .includes("rejected")
      ) {

        setAnswer(
          `There are ${rejected} rejected properties in the dataset.`
        );

      } else {

        setAnswer(
          "Dashboard analytics processed successfully."
        );
      }

      setLoading(false);

    }, 1500);
  };

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold mb-6">
        AI Property Assistant
      </h2>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask property analytics questions..."
        className="w-full border border-gray-300 rounded-xl p-4 h-32"
      />

      <button
        onClick={askAI}
        className="mt-4 bg-black text-white px-6 py-3 rounded-xl"
      >

        {loading
          ? "Thinking..."
          : "Ask AI"}

      </button>

      {answer && (

        <div className="mt-6 bg-gray-100 p-4 rounded-xl whitespace-pre-wrap">

          {answer}

        </div>

      )}

    </div>
  );
}
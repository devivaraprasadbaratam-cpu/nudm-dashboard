"use client";

import { useState } from "react";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

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

    try {

      const genAI =
        new GoogleGenerativeAI(
          process.env
            .NEXT_PUBLIC_GEMINI_API_KEY!
        );

      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
        });

      const prompt = `
You are a property tax analyst.

Dataset:
${JSON.stringify(properties.slice(0, 50))}

Question:
${question}
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response;

      const text =
        response.text();

      setAnswer(text);

    } catch (error) {

      console.error(error);

      setAnswer(
        "Something went wrong."
      );
    }

    setLoading(false);
  };

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

      <h2 className="text-3xl font-bold mb-6 text-black">

        AI Property Assistant

      </h2>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask property analytics questions..."
        className="w-full border border-gray-300 rounded-xl p-4 h-32 text-black"
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

        <div className="mt-6 bg-gray-100 p-4 rounded-xl whitespace-pre-wrap text-black">

          {answer}

        </div>

      )}

    </div>
  );
}
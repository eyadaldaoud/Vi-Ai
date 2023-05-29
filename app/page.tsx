"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [isMounting, setMounting] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      content: "Hello, What questions do you have for me?",
      role: "assistant",
    },
  ]);

  useEffect(() => {
    setMounting(false);
  }, []);

  if (isMounting) {
    return <p>Loading...</p>;
  }

  const generateResponse = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setPrompt("");
    setMessages((prevMessages) => {
      const newMessages = [
        ...prevMessages,
        { role: "user", content: prompt },
        { role: "assistant", content: "" },
      ];
      return newMessages;
    });

    const response = await fetch("/api/streaming", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        history: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      setMessages((prevMessages: any) => {
        const lastMsg = prevMessages.pop();
        const newMessages = [
          ...prevMessages,
          { role: lastMsg?.role, content: lastMsg?.content + chunkValue },
        ];
        return newMessages;
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mb-6 text-black dark:text-white font-semibold">
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <ol>
            <li className="text-lg font-semibold mb-4">
              ⚠ OpenAi limits request now, 3 requests / min.
            </li>
            <li>
              ~Refreshing the page or moving to another page will erase your
              chat history.
            </li>
            <li>~Each prompt costs, use when needed.</li>
            <li>
              ~The project is open source, you can clone it and add your own api
              key.
            </li>
          </ol>
        </div>
        <div className="sm:p-4 sm:border-2 rounded-lg dark:border-gray-800">
          <div className="h-full">
            {messages.map((msg, i) => (
              <div key={i} className="p-2">
                {msg.role === "assistant" ? (
                  <div
                    className={
                      "flex min-h-10 dark:bg-gray-900 bg-slate-200 rounded-xl"
                    }
                  >
                    <Image
                      className="w-14 h-auto rounded-tl-xl"
                      width={600}
                      height={800}
                      src="https://th.bing.com/th/id/OIG.lodndXX4dr6CqN0hXlx0?pid=ImgGn"
                      alt="Ai-Image"
                    />

                    <h3 className="text-md mt-auto mb-auto ml-2 p-2">
                      {msg.content}
                    </h3>
                  </div>
                ) : (
                  <div className="flex min-h-10 dark:bg-indigo-900 bg-blue-200 rounded-xl">
                    <Image
                      width={600}
                      height={800}
                      className="w-14 h-auto rounded-tl-xl"
                      src="https://th.bing.com/th/id/OIG.xfQKPOiZZg7VJKpnkQ6E?pid=ImgGn"
                      alt="User-Image"
                    />
                    <h3 className="text-md mt-auto mb-auto ml-2 p-2">
                      {msg.content}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={generateResponse} className="flex">
            <div className="w-[100%] flex">
              <input
                type="text"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                maxLength={200}
                disabled={isMounting || isLoading ? true : false}
                className="block w-full px-4 py-3 bg-transparent rounded focus:border-indigo-500 duration-100 ease-linear"
                placeholder={
                  isLoading
                    ? "Please wait, response in progress."
                    : isMounting
                    ? "Page is loading"
                    : "What's on your mind?"
                }
              />
            </div>
            <button
              disabled={isMounting || isLoading ? true : false}
              className="border-2 px-4 ml-2 rounded dark:bg-white dark:hover:bg-black duration-150 ease-linear dark:text-black dark:hover:text-white
              bg-black hover:bg-white text-white hover:text-black"
            >
              {isMounting || isLoading ? (
                <ImSpinner2 className="animate-spin text-lg" />
              ) : (
                <BsFillSendFill className="text-lg" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

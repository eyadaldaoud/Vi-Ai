"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { ImSpinner10, ImSpinner2 } from "react-icons/im";

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [chatLog, setChatLog] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isMounting, setMounting] = useState(true);

  const [messages, setMessages] = useState([
    {
      content: "Hello i'm Violet, how can i help you today?",
      role: "assistant",
    },
  ]);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        content: "Oops! There seems to be an error. Please try again.",
        role: "assistant",
      },
    ]);
    setLoading(false);
    setCurrentPrompt("");
  };

  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;

    if (messages.length >= 3) {
      setChatLog([
        [
          messages[messages.length - 2].message,
          messages[messages.length - 1].message,
        ],
      ]);
    }
  }, [messages]);

  useEffect(() => {
    textAreaRef.current.focus();
    setMounting(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentPrompt("");
    if (!currentPrompt.trim().match(/\S/)) {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: currentPrompt, role: "user" },
    ]);
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: currentPrompt, history: messages }),
    });

    if (!response.ok) {
      handleError();
      return;
    }

    // Reset user input
    const data = await response.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: data.message.content, role: "assistant" },
    ]);
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
            <li>
              ~Refreshing the page or moving to another page will cause data
              loss
            </li>
            <li>~Each prompt costs, use when needed.</li>
            <li>
              ~If you got an error sumbiting your prompt that means the api ran
              out of credits.
            </li>
            <li>
              ~The project is open source, you can clone it and add your own api
              key.
            </li>
          </ol>
        </div>
        <div className="sm:p-4 sm:border-2 rounded-lg  dark:border-gray-700">
          <div className="h-full" ref={messageListRef}>
            {messages.map((msg, i) => (
              <div key={i} className="p-2">
                {msg.role === "assistant" ? (
                  <div className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl">
                    <Image
                      className="w-14 h-14 rounded-tl-xl"
                      width={600}
                      height={800}
                      src="/ai.png"
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
                      className="w-14 h-14 rounded-tl-xl"
                      src="/user.webp"
                      alt="User-Image"
                    />
                    <h3 className="text-md mt-auto mb-auto ml-2 p-2">
                      {msg.content}
                    </h3>
                  </div>
                )}
              </div>
            ))}
              {loading ? 
                <div className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl mb-2 animate-pulse duration-75">
                    <Image
                      className="w-14 h-14 rounded-tl-xl"
                      width={600}
                      height={800}
                      src="/ai.png"
                      alt="Ai-Image"
                    />
                    <ImSpinner10 className="animate-spin text-2xl mt-auto mb-auto ml-4"/>
                    <h1 className="mt-auto mb-auto ml-2">Please hold.</h1>
                </div>
              : null }
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <div className="w-[100%] flex">
              <input
                ref={textAreaRef}
                type="text"
                onChange={(e) => setCurrentPrompt(e.target.value)}
                value={currentPrompt}
                maxLength={200}
                disabled={isMounting || loading ? true : false}
                className="block w-full p-4 text-sm text-gray-900 border
               border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
               focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                  loading
                    ? "Please wait, response in progress."
                    : isMounting
                    ? "Page is loading"
                    : "Speak your mind"
                }
              />
            </div>
            <button
              disabled={isMounting || loading ? true : false}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600
               to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
                dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2"
            >
                {isMounting || loading ? (
                  <ImSpinner2 className="animate-spin text-lg" />
                ) : (
                  <BsSend className="text-lg"/>
                )}
            </button>
          </form>
          <div className="flex justify-center mt-4">
            <button
              type="button"
              className={
                currentPrompt.length < 200
                  ? `text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
              dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`
                  : `text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`
              }
            >
              {currentPrompt.length} of 200
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

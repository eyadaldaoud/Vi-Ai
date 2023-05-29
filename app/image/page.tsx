"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { ImSpinner10, ImSpinner2 } from "react-icons/im";

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isMounting, setMounting] = useState(true);

  const [messages, setMessages] = useState([
    {
      content: "Hey, im here to turn your text into an image.",
      role: "assistant",
    },
  ]);

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
    setMounting(false);
  }, []);

  const handleSubmit = async (e: any) => {
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
    const response = await fetch("/api/image", {
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
      {
        content: `Images of ${currentPrompt}`,
        img: data.message.map((item: any) => item),
        role: "assistant",
      },
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
        <div className="sm:p-4 sm:border-2 rounded-lg  dark:border-gray-700">
          <div className="h-full">
            {messages.map((msg, i) => (
              <div key={i} className="p-2">
                {msg.role === "assistant" ? (
                  <div className="block">
                    <div className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl">
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

                    <div className="md:flex justify-center p-2">
                      {msg?.img?.map((img: any) => (
                        <div className="p-2">
                          <img
                            className="h-auto rounded-lg shadow-xl
                        dark:shadow-gray-800"
                            src={img?.url}
                            alt="image description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-10 dark:bg-indigo-900 bg-blue-200 rounded-xl">
                    <Image
                      className="w-14 h-auto rounded-tl-xl"
                      width={600}
                      height={800}
                      src="https://th.bing.com/th/id/OIG.xfQKPOiZZg7VJKpnkQ6E?pid=ImgGn"
                      alt="User-Image"
                    />
                    <h3 className="text-md mt-auto mb-auto ml-2">
                      {msg.content}
                    </h3>
                  </div>
                )}
              </div>
            ))}
            {isLoading ? (
              <div
                className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl mb-2 animate-pulse"
                style={{ animationDuration: "500ms" }}
              >
                <Image
                  className="w-14 h-14 rounded-tl-xl"
                  width={600}
                  height={800}
                  src="https://th.bing.com/th/id/OIG.lodndXX4dr6CqN0hXlx0?pid=ImgGn"
                  alt="Ai-Image"
                />
                <ImSpinner10 className="animate-spin text-2xl mt-auto mb-auto ml-4" />
                <h1 className="mt-auto mb-auto ml-2">Generating images....</h1>
              </div>
            ) : null}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex w-[100%]">
              <input
                type="text"
                onChange={(e) => setCurrentPrompt(e.target.value)}
                value={currentPrompt}
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
          <div className="flex justify-center mt-4"></div>
        </div>
      </div>
    </>
  );
}

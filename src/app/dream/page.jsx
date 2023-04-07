"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { ImSpinner10, ImSpinner2 } from 'react-icons/im'

const Styles = [
  {
    name: "Unrealistic",
    picture: "https://d3j730xi5ph1dq.cloudfront.net/dream/style_thumbnail/photorealism.jpg",
    id: 89,
  },
  {
    name: "Cartoonist",
    picture: "https://d3j730xi5ph1dq.cloudfront.net/dream/style_thumbnail/cartoonist_v2.jpg",
    id: 90,
  },
  {
    name: "Flora",
    picture: "https://d3j730xi5ph1dq.cloudfront.net/dream/style_thumbnail/floralv2.jpg",
    id: 81,
  },
  {
    name: "Buliojourney",
    picture: "https://d3j730xi5ph1dq.cloudfront.net/dream/style_thumbnail/buliojourney_v2.jpg",
    id: 84,
  },
  {
    name: "Anime",
    picture: "https://d3j730xi5ph1dq.cloudfront.net/dream/style_thumbnail/animev2.jpg",
    id: 80,
  },
]


export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [chatLog, setChatLog] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isMounting, setMounting] = useState(true);
  const [styleID, setStyleID] = useState(89)
  const [messages, setMessages] = useState([
    {
      content: "Hello im Violet, get started by picking a style and writing a prompt.",
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
    const response = await fetch("/api/dream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: currentPrompt, style: styleID }),
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
        img: data.message?.result?.final,
        imgUpdates: data?.message?.photo_url_list,
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
                ~Refreshing the page or moving to another page will cause data
                loss
              </li>
              <li>
                ~The project is open source, you can clone it and modify it.
              </li>
              <li>~This is a free to use api by Wombo DreamAi.</li>
            </ol>
        </div>
        <div className="sm:p-4 sm:border-2 rounded-lg  dark:border-gray-700">
          <div className="h-full" ref={messageListRef}>
            {messages.map((msg, i) => (
              <div key={i} className="p-2">
                {msg.role === "assistant" ? (
                  <div className="block">
                    <div className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl">
                      <Image
                        className="w-14 h-14 rounded-tl-xl"
                        width={600}
                        height={800}
                        src="/ai.png"
                        alt="Ai-Image"
                      />
                      <h3 className="text-md mt-auto mb-auto ml-2">
                        {msg.content}
                      </h3>
                    </div>
                        {msg?.img ? 
                            <>
                                <div className="flex lg:overflow-hidden overflow-x-scroll overflow-y-hidden justify-center p-2">
                                
                                    {msg?.imgUpdates?.map((singleUpdate, k) => (
                                        <Image key={k} width={100} height={100} src={singleUpdate}
                                        alt="image-updates" className="w-24 h-24"/>
                                    ))}
                                </div>
                                <div className="p-2 justify-center flex">
                                    <Image width={1080} height={1920} src={msg?.img}
                                    alt="final-image" className="lg:w-[500px] lg:h-[500px]"/>
                                </div> 
                            </>
                        : null} 
                    </div> 
                
              
                ) : (
                  <div className="flex min-h-10 dark:bg-indigo-900 bg-blue-200 rounded-xl">
                    <Image
                      className="w-14 h-14 rounded-tl-xl"
                      width={600}
                      height={800}
                      src="/user.jpg"
                      alt="User-Image"
                    />
                    <h3 className="text-md mt-auto mb-auto ml-2">
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
                    <h1 className="mt-auto mb-auto ml-2">This may take up to 3 minutes, Please hold.</h1>
                </div>
              : null }
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <div className="flex w-[100%]">
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
              className="ml-2 right-2.5 bottom-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium
                text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500
                hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {isMounting || loading ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  <BsSend />
                )}
              </span>
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
          <div className="flex flex-wrap justify-center">
              {Styles.map((item, k) => (
                  <div key={k} className={styleID == item.id ?
                  `block p-2 m-2 dark:hover:bg-slate-700 hover:bg-slate-400 cursor-pointer
                   duration-150 ease-linear rounded-lg bg-slate-700 text-white scale-110`
                  :`block p-2 m-2 dark:hover:bg-slate-700 hover:bg-slate-400 cursor-pointer
                    duration-150 ease-linear rounded-lg`} onClick={() => setStyleID(item.id)}>
                    <h1 className="text-center">{item.name}</h1>
                    <img src={item.picture} className="h-24 w-24"/>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

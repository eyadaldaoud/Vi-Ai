'use client'
import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaSpinner } from 'react-icons/fa'

export default function Home() {
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [chatLog, setChatLog] = useState([{}])
  const [loading, setLoading] = useState(false)
  const [isMounting, setMounting] = useState(true)

  const [messages, setMessages] = useState([
    {
      "content": "Hello im Vi, i'm ready to turn your prompt into an image!",
      "role": "assistant",
    }, 
    
  ]);
  
  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  const handleError = () => {
    setMessages((prevMessages) => [...prevMessages,
       { "content": "Oops! There seems to be an error. Please try again.", "role": "assistant" }]);
    setLoading(false);
    setCurrentPrompt("");
  }

  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;

    if (messages.length >= 3) {
      setChatLog([[messages[messages.length - 2].message, messages[messages.length - 1].message]]);
    }
  }, [messages]);


  useEffect(() => {
    textAreaRef.current.focus();
    setMounting(false)
  }, []);


  const handleSubmit = async(e) => {
    e.preventDefault();
    setCurrentPrompt("");
    if (!currentPrompt.trim().match(/\S/)) {
      return;
    }
    setMessages((prevMessages) => [...prevMessages, { "content": currentPrompt, "role": "user" }]);
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
  
    
    setMessages((prevMessages) => [...prevMessages, { "content": `Images of ${currentPrompt}`, "img": data.message.map((u) => u), "role": "assistant"}]);
    setLoading(false);
  }



  return (
    
    <>
      <div className="mb-6 text-black dark:text-white font-semibold">
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Refreshing the page or moving to another page will cause data loss</span>
        </div>
        <div className="sm:p-4 sm:border-2 rounded-lg  dark:border-gray-700">
          <div className="h-full" ref={messageListRef}>
            {messages.map((msg, i) => (
              <div key={i} className="p-2">
                {msg.role === 'assistant' ?
                <div className="block">
                <div className="flex min-h-10 dark:bg-gray-800 bg-slate-300 rounded-xl">
                  <img className="w-10 h-10 rounded-tl-xl" 
                  src="https://th.bing.com/th/id/OIG.s5viykXLbQf3fhOYX14O?pid=ImgGn" alt="Ai-Image" />
                  <h3 className="text-md mt-auto mb-auto ml-2">{msg.content}</h3>
                  </div>

                  <div className="md:flex justify-center p-2">
                    {msg?.img?.map((single) => (
                      
                      <div className="p-2">
                        <img className="h-auto  rounded-lg shadow-xl
                        dark:shadow-gray-800" src={single?.url} 
                        alt="image description" />
                      </div>

                    ))}
                    
                  </div> 
                </div> 
                : 
                <div className="flex min-h-10 dark:bg-indigo-900 bg-blue-200 rounded-xl">
                   <img className="w-10 h-10 rounded-tl-xl" 
                  src="https://i.imgur.com/oOqsutm.png" alt="User-Image" />
                  <h3 className="text-md mt-auto mb-auto ml-2">{msg.content}</h3>
                </div>
                 }
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              
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
                placeholder={loading ? "Please wait, response in progress." : isMounting ? "Page is loading" : "Speak your mind"}
              />
              <button disabled={isMounting || loading ? true : false} className="absolute right-2.5 bottom-2 inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium
               text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500
                hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {isMounting || loading ? <FaSpinner className="animate-spin"/> : <BsSend />}
                </span>
                  <div className={currentPrompt.length < 200 ? "ml-2" : "ml-2 text-red-600"}>
                  {currentPrompt.length} / 200
                  </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

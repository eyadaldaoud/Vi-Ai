"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { BsFillSendFill, BsRobot, BsSend, BsArrowDown } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import ai_img from "../../public/ai-img.jpg";
import user_img from "../../public/user-img.jpg";
import { SiOpenai } from "react-icons/si";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant powered by Groq's Llama 3.3 model. How can I help you today?",
    },
  ]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: prompt,
          history: messages.slice(-4),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Groq API");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.message?.content ||
          data.response ||
          "Sorry, I could not generate a response.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(
        "An error occurred while generating the response. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.role === "assistant" ? (
                      <BsRobot className="text-blue-500" />
                    ) : (
                      <SiOpenai className="text-white" />
                    )}
                    <span className="font-semibold">
                      {message.role === "assistant" ? "Assistant" : "You"}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative">
                    <BsRobot className="text-blue-500 text-xl" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <span className="font-semibold">Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="shrink-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 p-4">
        <motion.form
          onSubmit={generateResponse}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
                disabled={loading}
              />
              <motion.button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-200 ${
                  loading || !prompt.trim()
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                }`}
                whileHover={!loading && prompt.trim() ? { scale: 1.05 } : {}}
                whileTap={!loading && prompt.trim() ? { scale: 0.95 } : {}}
                disabled={loading || !prompt.trim()}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <BsArrowDown className="text-white text-lg" />
                  </motion.div>
                ) : (
                  <BsSend className="text-white text-lg" />
                )}
              </motion.button>
            </div>
            <div className="mt-2 flex items-center justify-between px-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {loading ? "Generating response..." : "Press Enter to send"}
              </span>
              {prompt.length > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {prompt.length}/200
                </span>
              )}
            </div>
          </div>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-2xl"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
}

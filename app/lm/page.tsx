"use client";

import { useEffect, useState, useRef } from "react";
import { BsRobot, BsSend, BsArrowDown } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function LMPage() {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI assistant powered by LM Studio. How can I help you today?",
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
      const response = await fetch("/api/lm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          history: messages.slice(-4),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from LM Studio");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      setError(
        "An error occurred while generating the response. Please ensure LM Studio is running locally and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto overflow-hidden">
      <div className="p-4 mb-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium">Local Setup Required</p>
          </div>
          <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            This model requires LM Studio to be running locally. Please ensure
            you have LM Studio installed and running on your machine.
          </p>
        </div>
      </div>

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
                      <IoPerson className="text-white" />
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
                <p className="text-gray-500 dark:text-gray-400">Thinking...</p>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <div className="max-w-[80%] rounded-2xl p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
                <p>{error}</p>
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
      </div>
    </div>
  );
}

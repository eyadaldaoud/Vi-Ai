"use client";

import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Visit My Website
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Check out my portfolio and get in touch!
        </p>
        <motion.a
          href="https://eyad.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Go to Portfolio
          <BsArrowRight className="ml-2" />
        </motion.a>
      </motion.div>
    </div>
  );
}

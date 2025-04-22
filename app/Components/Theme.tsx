"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { motion } from "framer-motion";

interface ThemesType {
  value: string;
  icon: any;
  label: string;
}

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const themes: ThemesType[] = [
    { value: "system", icon: <HiOutlineDesktopComputer />, label: "System" },
    { value: "dark", icon: <BiMoon />, label: "Dark" },
    { value: "light", icon: <MdOutlineWbSunny />, label: "Light" },
  ];

  if (Loading) {
    return (
      <div className="flex justify-content-center">
        <div className="inline-flex rounded-xl shadow-sm border dark:border-gray-600 border-gray-300 dark:bg-gray-800 bg-gray-200">
          {themes.map((i, k) => (
            <div
              key={k}
              className="inline-flex items-center px-1.5 py-1 text-sm bg-transparent rounded-lg border-gray-900"
            >
              {i.icon}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-content-center">
      <div className="inline-flex rounded-xl shadow-sm border dark:border-gray-600 border-gray-300 dark:bg-gray-800 bg-gray-200">
        {themes.map((i, k) => (
          <motion.button
            onClick={() => setTheme(i.value)}
            key={k}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${
              i.value === theme
                ? "inline-flex items-center px-2 py-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg"
                : "inline-flex items-center px-2 py-1 text-sm bg-transparent rounded-lg border-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span className="text-base">{i.icon}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Theme;

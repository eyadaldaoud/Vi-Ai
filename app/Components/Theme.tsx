"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon } from "react-icons/bi";
import { MdOutlineWbSunny } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";

interface ThemesType {
  value: string;
  icon: any;
}
const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const themes: ThemesType[] = [
    { value: "system", icon: <HiOutlineDesktopComputer /> },
    { value: "dark", icon: <BiMoon /> },
    { value: "light", icon: <MdOutlineWbSunny /> },
  ];

  if (Loading) {
    return (
      <div className="flex justify-content-center">
        <div className="inline-flex rounded-2xl shadow-sm border dark:border-gray-600 border-gray-300 dark:bg-gray-800 bg-gray-200">
          {themes.map((i, k) => (
            <div
              key={k}
              className="inline-flex items-center px-2 py-1.5 text-lg bg-transparent rounded-xl border-gray-900 p-2"
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
      <div className="inline-flex rounded-2xl shadow-sm border dark:border-gray-600 border-gray-300 dark:bg-gray-800 bg-gray-200">
        {themes.map((i, k) => (
          <button
            onClick={() => setTheme(i.value)}
            key={k}
            className={`${
              i.value == theme
                ? "inline-flex items-center px-2 py-1.5 text-lg bg-transparent rounded-xl text-red-500 p-2 border border-red-500"
                : "inline-flex items-center px-2 py-1.5 text-lg bg-transparent rounded-xl border-gray-900 p-2"
            }`}
          >
            {i.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Theme;

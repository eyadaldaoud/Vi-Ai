"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { SiOpenai } from "react-icons/si";
import { IoCloudOfflineOutline, IoGitNetworkSharp } from "react-icons/io5";

interface LinksProps {
  name: string;
  href: string;
  icon: any;
  description?: string;
}

const Navitems: LinksProps[] = [
  {
    name: "Groq",
    href: "/groq",
    icon: <IoGitNetworkSharp />,
    description: "Compound Beta Model",
  },
  {
    name: "LM Studio",
    href: "/lm",
    icon: <IoCloudOfflineOutline />,
    description: "Local Model",
  },
  {
    name: "ChatGPT",
    href: "/",
    icon: <SiOpenai />,
    description: "Streaming",
  },
  {
    name: "ChatGPT",
    href: "/gpt-nostream",
    icon: <SiOpenai />,
    description: "Standard",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <MdOutlineConnectWithoutContact />,
    description: "Get in Touch",
  },
];

const Navlinks = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-2">
      {Navitems.map((item, index) => (
        <Link key={index} href={item.href}>
          <motion.li
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center p-3 rounded-lg transition-all duration-200 ${
              pathname === item.href
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg ${
                  pathname === item.href
                    ? "bg-white/20"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {item.icon}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
            {pathname === item.href && (
              <motion.div
                layoutId="activeNavItem"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.li>
        </Link>
      ))}
    </div>
  );
};

export default Navlinks;

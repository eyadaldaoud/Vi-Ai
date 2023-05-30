"use client";

import Link from "next/link";
import { FaPaypal } from "react-icons/fa";
import { SiNextdotjs, SiOpenai, SiVercel } from "react-icons/si";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose, IoLogoVercel } from "react-icons/io5";
import Theme from "./Theme";
import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsGithub } from "react-icons/bs";
import Navlinks from "./Navlinks";

interface FooterProps {
  name: string;
  text: string;
  to: string;
  icon?: any;
}

const FooterItems: FooterProps[] = [
  {
    name: "Deployed on",
    text: "Vercel",
    to: "https://vercel.com",
    icon: <SiVercel className="text-lg ml-2 mt-auto mb-auto" />,
  },
  {
    name: "Made with",
    text: "NextJS 13",
    to: "https://nextjs.org",
    icon: <SiNextdotjs className="text-lg ml-2 mt-auto mb-auto" />,
  },
  {
    name: "Made by",
    text: "Eyad Zoubi",
    to: "https://www.linkedin.com/in/eyad-zoubi-93327b244/",
  },
];

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {isLoading ? (
                <button
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
                dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span
                    className="relative px-1 py-1 transition-all ease-in duration-75 bg-white
                dark:bg-black rounded-md group-hover:bg-opacity-0"
                  >
                    <ImSpinner2 className="animate-spin" />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  {!isOpen ? (
                    <HiMenuAlt4 className="text-xl" />
                  ) : (
                    <IoClose className="text-xl" />
                  )}
                </button>
              )}

              <Link href="/" className="flex ml-2 md:mr-24 mt-2">
                <IoLogoVercel className="text-3xl mr-2" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Eyad
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ml-3 mt-2">
                <div>
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={
          !isOpen
            ? "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-800"
            : "fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-black dark:border-gray-800"
        }
        aria-label="Sidebar"
      >
        <div className="h-full mt-8 px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
          <ul className="space-y-2">
            <Navlinks />
            <li>
              <Link
                href="https://github.com/UGoingNoWhereBoy/Vi-Ai"
                target="_blank"
                className="rounded-md flex items-center p-2 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-900 hover:text-indigo-300 ease-linear duration-150"
              >
                <BsGithub className="text-xl" />
                <span className="ml-3">Give it a star</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://paypal.me/apexa1?country.x=JO&locale.x=en_US"
                target="_blank"
                className="rounded-md flex items-center p-2 text-base text-white font-semibold bg-sky-500 hover:bg-sky-900 hover:text-sky-300 ease-linear duration-150"
              >
                <FaPaypal className="text-xl" />
                <span className="ml-3">Donate with Paypal</span>
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            {FooterItems.map((i, k) => (
              <Link
                href={i.to}
                target={"_blank"}
                className="flex font-sans mb-2 border px-2 py-2 rounded dark:bg-white dark:hover:bg-black duration-100 ease-linear dark:text-black dark:hover:text-white
                bg-black hover:bg-white text-white hover:text-black"
                key={k}
              >
                <h1 className="text-md mt-auto mb-auto">{i.name}</h1>
                {i.icon}
                <span className="self-center text-lg ml-2">{i.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="mt-24 rounded-lg bg">{children}</div>
      </div>
    </>
  );
};

export default Navbar;

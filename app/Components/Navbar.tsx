"use client";

import Link from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Theme from "./Theme";
import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsGithub } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import Navlinks from "./Navlinks";
import { BiAtom } from "react-icons/bi";
import { SiBuymeacoffee, SiVercel } from "react-icons/si";

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
                <span className="animate-bounce">
                  <SiVercel className="text-3xl mr-2  text-red-500  rotate-180" />
                </span>
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500">
                  VI~AI
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ml-3 mt-2 flex-wrap">
                <div
                  className="mr-2 border py-0.5 px-2 rounded border-red-500 hover:bg-red-100 hover:dark:bg-red-900 ease-linear 
                duration-100 animate-pulse mt-auto mb-auto sm:flex hidden"
                >
                  <AiOutlineWarning className="text-red-500 mt-auto mb-auto mr-2" />
                  <Link
                    href={"https://github.com/UGoingNoWhereBoy/Vi-Ai"}
                    target="_blank"
                    className="text-red-500"
                  >
                    API KEY EXPIRED
                  </Link>
                </div>
                <div>
                  <Theme />
                </div>
              </div>
            </div>
          </div>
          <div
            className="mr-2 border py-0.5 px-2 rounded border-red-500 hover:bg-red-100 hover:dark:bg-red-900 ease-linear 
                duration-100 animate-pulse mt-2 mb-auto sm:hidden flex"
          >
            <AiOutlineWarning className="text-red-500 mt-auto mb-auto mr-2" />
            <Link
              href={"https://github.com/UGoingNoWhereBoy/Vi-Ai"}
              target="_blank"
              className="text-red-500"
            >
              API KEY EXPIRED
            </Link>
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
                href="https://www.buymeacoffee.com/eyadzoubi"
                target="_blank"
                className="rounded-md flex items-center p-2 text-base font-semibold text-white bg-yellow-600 hover:bg-yellow-900 hover:text-yellow-300 ease-linear duration-150"
              >
                <SiBuymeacoffee className="text-xl" />
                <span className="ml-3">Buy me a coffee</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="mt-24 rounded-lg bg">{children}</div>
      </div>
    </>
  );
};

export default Navbar;

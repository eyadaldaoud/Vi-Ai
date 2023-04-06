'use client'

import Link from "next/link";
import { FaPaypal } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import Theme from "./Theme";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { RiEye2Line } from 'react-icons/ri';
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
import { BsGithub } from "react-icons/bs";
import { GiTreeRoots } from 'react-icons/gi'
const Navbar = ({children}) => {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [])
  return (
    <>
    
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              {isLoading ? 
               <button 
               className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
                dark:hover:bg-gray-700 dark:focus:ring-gray-600">
               <span className="relative px-1 py-1 transition-all ease-in duration-75 bg-white
                dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                   <Spinner />
               </span>
           
               </button>: 
              <button
                onClick={() => setOpen(!isOpen)}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                  {!isOpen ? <HiMenuAlt4 className="text-xl"/> 
                  : <IoClose className="text-xl"/>}
                  
              </button>}
              
              <Link href="/" className="flex ml-2 md:mr-24 mt-2">
              <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-700 from-purple-500">Violet</span>
              </h1>
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
        id="logo-sidebar"
        className={!isOpen ? "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        : "fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"}
        aria-label="Sidebar"
      >
        <div className="h-full mt-8 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <SiOpenai />
                <span className="ml-3">GPT 3.5</span>
              </Link>
            </li>
            <li>
            <Link
                href="/image"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <RiEye2Line />
                <span className="ml-3">DALL-E</span>
              </Link>
            </li>
            <li>
            <Link
                href="/dream"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <RiEye2Line />
                <span className="ml-3">DREAM</span>
              </Link>
            </li>
            <li>
            <Link
                href="/connect"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <MdOutlineConnectWithoutContact />
                <span className="ml-3">Get in touch</span>
                
              </Link>
            </li>
            <li>
            <Link
                href="https://github.com/UGoingNoWhereBoy/Vi-Ai"
                target="_blank" className="rounded-md flex items-center p-2 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-900 hover:text-indigo-300 ease-linear duration-150"
              >
               <BsGithub className="text-xl" />
                <span className="ml-3">View on Github</span>
                
              </Link>
            </li>
            <li>
            <Link
                href="https://emberium.myshopify.com/"
                target="_blank" className="rounded-md flex items-center p-2 text-base text-black font-semibold bg-amber-500 hover:bg-amber-900 hover:text-amber-300 ease-linear duration-150"
              >
               <GiTreeRoots className="text-xl" />
                <span className="ml-3">Emberium</span>
                
              </Link>
            </li>
            <li>
            <Link
                href="https://paypal.me/apexa1?country.x=JO&locale.x=en_US"
                target="_blank" className="rounded-md flex items-center p-2 text-base text-white font-semibold bg-sky-500 hover:bg-sky-900 hover:text-sky-300 ease-linear duration-150"
              >
               <FaPaypal className="text-xl" />
                <span className="ml-3">Donate with Paypal</span> 
              </Link>
            </li>
          
          </ul>
        </div>
      </aside>
        <div className="p-4 sm:ml-64">
        <div className="mt-24  rounded-lg">
            {children}
        </div>
        </div>
    </>
  );
};

export default Navbar;

'use client'

import Link from "next/link"
import { useState } from "react"
import { FaConnectdevelop, FaEye, FaPaypal } from "react-icons/fa"
import { SiOpenai } from "react-icons/si"
import { AiOutlineClose } from 'react-icons/ai'
const Mobilenav = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
    <svg onClick={() => setOpen(true)}
        className="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
    </svg>
    {isOpen ?
    <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <AiOutlineClose  className="ml-auto mr-auto mb-4 text-xl" onClick={() => setOpen(false)}/>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            
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
                className="flex items-center p-2
                 text-base font-normal text-gray-900 rounded-lg
                  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <FaEye />
                <span className="ml-3">Image generator</span>
              </Link>
            </li>
            <li>
            <Link
                href="/connect"
                className="flex items-center p-2 text-base font-normal
                 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
               <FaConnectdevelop />
                <span className="ml-3">Get in touch</span>
                
              </Link>
            </li>
            <li>
            <Link
                href="https://paypal.me/apexa1?country.x=JO&locale.x=en_US"
                target={"_blank"}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
                 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-blue-500 duration-200 ease-linear"
              >
               <FaPaypal />
                <span className="ml-3">Donate with Paypal</span>
              </Link>
            </li>
          </ul>
        </div>
       
      </aside> : null}
    </>
  )
}

export default Mobilenav
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { RiEye2Line } from "react-icons/ri";
import { SiOpenai } from "react-icons/si";

interface LinksProps {
  name: string;
  href: string;
  icon: any;
}

const Navitems: LinksProps[] = [
  {
    name: "ChatGPT 3.5 (Stream)",
    href: "/",
    icon: <SiOpenai />,
  },
  {
    name: "ChatGPT 3.5",
    href: "/gpt-nostream",
    icon: <SiOpenai />,
  },
  {
    name: "DALL-E",
    href: "/image",
    icon: <RiEye2Line />,
  },
  {
    name: "Get in touch",
    href: "/contact",
    icon: <MdOutlineConnectWithoutContact />,
  },
];

const Navlinks = () => {
  const pathname = usePathname();

  return (
    <>
      {Navitems.map((l, k) => (
        <Link key={k} href={l.href} className="">
          <li
            className={
              pathname === l.href
                ? "flex items-center mb-2 bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded duration-150 transition"
                : "flex items-center mb-2 bg-white dark:bg-black text-black dark:text-white px-6 py-4 rounded duration-75 transition hover:dark:bg-gray-800 hover:bg-slate-300"
            }
          >
            {l.icon}
            <span className="ml-3"> {l.name}</span>
          </li>
        </Link>
      ))}
    </>
  );
};

export default Navlinks;

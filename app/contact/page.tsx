import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { ImProfile } from "react-icons/im";

interface LinksProps {
  name: string;
  icon: any;
  to: string;
}

const links: LinksProps[] = [
  {
    name: "Github",
    icon: <FaGithub />,
    to: "https://github.com/UGoingNoWhereBoy",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    to: "https://www.linkedin.com/in/eyad-zoubi-93327b244/",
  },
  { name: "Gmail", icon: <SiGmail />, to: "mailto:ugnw20@gmail.com" },
  {
    name: "Portfolio",
    icon: <ImProfile />,
    to: "https://eyad.vercel.app/",
  },
];

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://cdn.shopify.com/s/files/1/0724/2455/4805/files/ui.png?v=1676965944"
            alt="Eyad's image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Eyad Zoubi
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400"></span>
          <div className=" mt-4 space-x-3 md:mt-6">
            {links.map((item, k) => (
              <Link
                key={k}
                href={item.to}
                target={"_blank"}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white
                  dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

'use client'
import { Spinner } from 'flowbite-react';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import {BsFillMoonStarsFill, BsFillSunFill, BsMoon, BsMoonStars, BsSun } from 'react-icons/bs'
const Theme = () => {
  const {setTheme, theme} = useTheme();
  const [loading, setLoading] = useState(true)
  const Themestate = theme === 'dark' ? 'dark' : 'light';
  useEffect(() => {
    setTheme(Themestate)
    setLoading(false)
  }, [])
  if(loading){
    return  <button 
    className="relative inline-flex items-center justify-center p-0.5
     mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
     bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500
    group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none
    focus:ring-purple-200 dark:focus:ring-purple-800">
    <span className="relative px-4 py-1 transition-all ease-in duration-75 bg-white
     dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        <Spinner />
    </span>

    </button>
  
  }
  return (
    <div>
        <button onClick={() => setTheme(Themestate == 'dark' ? 'light' : 'dark')} 
        className="relative inline-flex items-center justify-center p-0.5
         mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
         bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500
        group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none
        focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white
         dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {Themestate === 'dark' ? <BsMoonStars className='text-lg'/> : <BsSun className='text-lg'/>}
        </span>
        </button>
    </div>
  )
}

export default Theme
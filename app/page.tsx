"use client"
import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import {FaGithub, FaLinkedin, FaDev } from "react-icons/fa"
import { UserContext } from "./context/usercontext";

export default function Home() {

  const {user, token,setLoc} = useContext(UserContext)

  useEffect(() => {
    setLoc('')
  }, [])
  
  
  return (
        <div className="  overflow-y-hidden h-screen" style={{}}>
            {/* Code block starts */}
                <div className=" bg-transparent">
                    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                            <h1 className="text-2xl  mb-1 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-slate-100 font-black leading-7 md:leading-10">
                                vBlog -  a blogging website by
                               <a href="https://portfolio-vaxad.netlify.app/" target="_blank"> <span className="text-indigo-700 hover:text-purple-800 cursor-pointer"> vaxad </span></a>
                            </h1>
                            {user&&<p className="mt-1 sm:mt-10 lg:w-full text-gray-300 font-normal text-center lg:text-2xl">Welcome {user.name}!</p>}
                            <p className="mt-1 sm:mt-2 lg:w-full text-gray-400 font-normal text-center text-sm sm:text-lg">Explore a world of insights and ideas with our captivating blog posts. Dive into thought-provoking articles that cover a wide range of topics, from technology and science to arts and culture.</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link href={'/makeBlog'}>
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog</button>
                            </Link>
                            <Link href={'/viewBlogs'}>
                            <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-white lg:text-xl lg:font-bold  hover:text-slate-100 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm">View vBlogs</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" justify-center text-slate-300 flex w-full text-5xl absolute bottom-5">
                <a target="_blank" href="https://www.linkedin.com/in/varad-prabhu-622621270/" className=" mx-5 hover:text-white hover:scale-110">
                  <FaLinkedin></FaLinkedin>
                </a>
                <a target="_blank" href="https://github.com/vaxad" className=" mx-5 hover:text-white hover:scale-110">
                  <FaGithub></FaGithub>
                </a>
                <a target="_blank" href="https://devfolio.co/@varadprabhu" className=" mx-5 hover:text-white hover:scale-110">
                  <FaDev></FaDev>
                </a>
                </div>
        </div>
  )
}

"use client"
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { vContext } from '../context/context';
import {useRouter} from 'next/navigation'
import { UserContext } from '../context/usercontext';
import { getMe } from '@/lib/auth';

export default function Navbar() {

  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState(false);
  const {loc,setLoc}=useContext(UserContext)
  
  const {token, setToken,user,setUser} = useContext(UserContext)
  const [auth,setAuth] = useState(typeof window !== 'undefined' ?localStorage.getItem("token"):false)

  
  const router=useRouter()

  const handleLogout = () =>{
    router.push('/')
    console.log("logout")
    setToken('')
    setUser(null)
    localStorage.setItem('token','')
  }
  
  useEffect(() => {
    // Perform localStorage action
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("token")!==''){
            setToken(localStorage.getItem("token"))
        }
    }
    if(token!==""&&token!==null){
        setAuth(true)
        const handleToken=async () =>{
            console.log("handletoken")
            const myData = await getMe(token as string)
            setUser(myData)
          }
        handleToken()
    }else{
        setAuth(false)
    }
  }, [token, setToken])

  useEffect(() => {
    if(loc.includes('viewBlogs')){
        setBlogs(true)
    }else{
        setBlogs(false)
    }
    
  }, [loc])
  

  return (
    <nav className="w-full sticky bg-gray-900">
                    <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
                        <div aria-label="Home. logo"  role="img">
                            <img className="w-24 h-24 md:w-auto" src="/logo.png" alt="logo" />
                        </div>
                        <div>
                            <button onClick={() => setShow(!show)} className={`${show ? 'hidden' : ''} sm:block md:hidden bg-slate-900 text-gray-100 hover:text-gray-400 focus:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400`}>
                                <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={8} x2={20} y2={8} />
                                    <line x1={4} y1={16} x2={20} y2={16} />
                                </svg>
                            </button>
                            <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                                <button onClick={() => setShow(!show)} className={`block md:hidden lg:hidden bg-slate-900 text-gray-100 hover:text-gray-400 focus:text-gray-400 fixed focus:outline-none focus:ring-2 focus:ring-gray-400 z-30 top-0 mt-6`}>
                                    <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </button>
                                <ul className="flex text-3xl md:text-base items-center py-10 md:flex flex-col md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-slate-950 md:bg-transparent z-20">
                                    <li className={`${loc===''?"text-gray-100":"text-gray-400"} hover:text-gray-100 cursor-pointer text-base lg:text-lg pt-10 md:pt-0`}>
                                        <Link href="/" onClick={()=>{setLoc('')}}>Home</Link>
                                    </li>
                                    <li className={`${loc==='blogs'?"text-gray-100":"text-gray-400"} hover:text-gray-100 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10`}>
                                        <Link href="/viewBlogs" onClick={()=>{setLoc('blogs')}}>Blogs</Link>
                                    </li>
                                    <li className={`${loc==='profile'?"text-gray-100":"text-gray-400"} hover:text-gray-100 cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10`}>
                                        <Link href="/profile" onClick={()=>{setLoc('profile')}}>Profile</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {!auth?<Link href={'/login'}>
                            <button className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
                            Log In
                            </button>
                            </Link>:
                            <button onClick={()=>{handleLogout()}} className="focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 hidden md:block bg-transparent transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-8 py-1 sm:py-3 text-sm">
                            Log Out
                            </button>
                            }
                    </div>
                </nav>
  )
}

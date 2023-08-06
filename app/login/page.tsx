"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { useState } from "react";
import { UserContext } from '../context/usercontext';
import { getMe, login } from '@/lib/auth';

  
export default function Login() {
  const {token,setToken,setUser} = useContext(UserContext)
    const [email, setEmail] =  useState("")
    const [pass, setPass] = useState("")
    const [remember, setRemember] = useState(false)
    const router = useRouter()
    // const localtoken=localStorage.getItem('token')

    useEffect(() => {
      if(token!==""){
        router.push('/')
      }
    }, [token])
    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const res= await login({email,password:pass})
        // console.log(res)
        if(res===null){
          alert('wrong credentials')
        }else{
          setToken(res)
          const myData = await getMe(res)
          setUser(myData)
        }
    }

  return (
  <div className=' w-full items-center justify-center flex py-4'>
<form className=' w-2/4 ' onSubmit={e=>handleSubmit(e)}>
  <div className="mb-6 ">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox"  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
    </div>
    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <div className=' flex items-center justify-center '>
  <button type="submit" className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button>
  </div>
    <div className='py-5 items-center justify-center flex'><span className='text-sm font-medium text-gray-900 dark:text-white'>New to vBlog? <Link className=' hover:text-indigo-700' href={'/signup'}>Sign up</Link></span></div>
</form>
</div>
  )
}

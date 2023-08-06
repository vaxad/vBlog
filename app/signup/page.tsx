"use client"
import { useRouter } from 'next/navigation';
import React, { use, useContext, useEffect } from 'react'
import { useState } from "react";
import { UserContext } from '../context/usercontext';
import { getMe, signup } from '@/lib/auth';
  
export default function Login() {
  const {user,setUser,token,setToken} = useContext(UserContext)
    const [name,setName] = useState("")
    const [email, setEmail] =  useState("")
    const [pass, setPass] = useState("")
    const [cpass, setcPass] = useState("")
    const [remember, setRemember] = useState(false)
    const router = useRouter()

    useEffect(() => {
      // console.log(token)
      if(token!==""){
        router.push('/')
      }
      
    }, [token])
    

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(pass===cpass){
          const password=pass
          const res = await signup({name, email, password})
          if(res===null){
            alert('user with this email already exists')
          }else{
            setToken(res)
            const myData = await getMe(res)
            setUser(myData)
          }
        
        }else{
          alert('passwords donot match')
        }
    }

  return (
  <div className=' w-full items-center justify-center flex py-4'>
<form className=' w-2/4 ' onSubmit={e=>handleSubmit(e)}>
<div className="mb-6 ">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Robert Oppenheimer" required/>
  </div>
  <div className="mb-6 ">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="father@bomb.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set password</label>
    <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
    <input type="password" value={cpass} onChange={(e)=>setcPass(e.target.value)} id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
  </div>
  <div className="flex items-start mb-6">
    
    </div>
    <div className=' flex items-center justify-center '>
  <button type="submit" className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
  </div>
 </form>
</div>
  )
}

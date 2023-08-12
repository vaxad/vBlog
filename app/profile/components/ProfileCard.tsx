"use client"
import { UserContext } from '@/app/context/usercontext'
import { getMe } from '@/lib/auth'
import { followUser, unfollowUser } from '@/lib/user'
import { User } from '@/types'
import React, { useContext, useEffect, useState } from 'react'
type Props={
    userShown:User
}
export default function ProfileCard({userShown}:Props) {
    const {user}= useContext(UserContext)
    const [followed,setFollowed]=useState(userShown.followers.includes((user as User)?._id))
    
    const handleFollow=async()=>{
        setFollowed(true)
        userShown.followers.push((user as User)?._id)
        const resp=await followUser(userShown._id)
        //(resp)
    }

    const handleUnfollow=async()=>{
        setFollowed(false)
        const newFollowers=userShown.followers.filter((el)=>{
            return el!==(user as User)._id
        })
        userShown.followers=newFollowers
        const resp=await unfollowUser(userShown._id)
        //(resp)
    }

    if(userShown._id===(user as User)._id){
  return userShown&&(
    <main className='flex justify-center items-center'>
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center p-3">

        <div className="flex flex-col items-center pb-10 pt-4 p-4">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/pfp3.jpg" alt="Bonnie image"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userShown.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{userShown.email}</span>
            <div className="flex mt-4 space-x-3 md:mt-6 p-4">
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">{userShown.followers.length} followers</div>
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">{userShown.following.length} following</div>
            </div>
        </div>
    </div>
    </main>
  )}else{
    return userShown&&(
        <main className='flex justify-center items-center'>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center p-3">
    
            <div className="flex flex-col items-center pb-10 pt-4 p-4">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/pfp3.jpg" alt="Bonnie image"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userShown.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{userShown.email}</span>
                <div className="flex mt-4 space-x-3 md:mt-6 p-4">
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">{userShown.followers.length} followers</div>
                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">{userShown.following.length} following</div>
                </div>
                <div className="flex mt-4 space-x-3 md:mt-6">
            {!followed?<div onClick={()=>{handleFollow()}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Follow</div>
            :<div onClick={()=>{handleUnfollow()}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Unfollow</div>
             }
       </div>
            </div>
        </div>
        </main>
      )
  }
}

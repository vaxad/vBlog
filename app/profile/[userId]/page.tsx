"use client"
import { getAllBlogs, getBlogBy, getBlogs } from '@/lib/blog'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/usercontext'
import Spinner from '../components/Spinner'
import Blog from '../components/Blog'
import { BlogPost, User } from '@/types'
import Link from 'next/link'
import ProfileCard from '../components/ProfileCard'
import { getMe } from '@/lib/auth'
import { getUser } from '@/lib/user'

type Params = {
    params: {
        userId:string
    }
}
export default function UserProfile({params:{userId}}:Params) {
    const { setLoc, user } = useContext(UserContext)
    const me:User=user as User
  const [blogList, setBlogList] = useState<BlogPost[] | null>(null)
  const [userShown, setuserShown] = useState<User | null>(null)

  const content = blogList?.map(el => {
    return (
      <div key={el._id} className=' py-4'>
        <Blog blog={el} />
      </div>
    )
  })

  const loadBlogs = async () => {
    const userData= await getUser(userId)
    const userShowed:User = userData
    setuserShown(userShowed)
    const res = await getBlogBy(userId)
    const newBlogList = res
    //(newBlogList)
    setBlogList(newBlogList)
  }

  useEffect(() => {
    setLoc('profile')
    loadBlogs()
  }, [setLoc,loadBlogs])


  return !blogList ? (
    <Spinner />) : blogList.length === 0 ? (<main>
        <div className=' w-full justify- text-xl items-center text-center text-gray-100 mt-10  align-top'>
        <ProfileCard userShown={userShown as User}/>
        {((userShown as User)._id===me._id)&&<Link href={'/makeBlog'}>
          <button className="mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog now!</button>
        </Link>}
      </div>

    </main>) : (
    <main>
        <div className='profile grid lg:grid-flow-col-dense lg:grid-cols-4 lg:grid-rows-1 h-screen overflow-hidden p-2'>
          <div className=' col-span-1 w-fit z-10 overflow-hidden flex justify-start items-start'>
          <ProfileCard userShown={userShown as User}/>
          </div>
          <div className=' text-slate-100 col-span-3 overflow-y-scroll w-full flex flex-col items-end px-8'><div className='w-full'>{content}</div>
          {((userShown as User)._id===me._id)&&<div className=' w-full justify-center text-xl items-center text-center text-gray-100 mt-10 pb-10'>
        <h1>Post more vBlogs!</h1>
        <Link href={'/makeBlog'}>
          <button className="mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog now!</button>
        </Link>
      </div>
      }
      </div>
        </div>
        
    </main>
  )
}

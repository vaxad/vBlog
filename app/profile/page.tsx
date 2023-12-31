"use client"
import { getAllBlogs, getBlogBy, getBlogs } from '@/lib/blog'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/usercontext'
import Spinner from './components/Spinner'
import Blog from './components/Blog'
import { BlogPost, User } from '@/types'
import Link from 'next/link'
import ProfileCard from './components/ProfileCard'

export default function MyProfile() {
  const { setLoc, user } = useContext(UserContext)
  const [blogList, setBlogList] = useState<BlogPost[] | null>(null)

  useEffect(() => {
    setLoc('profile')
    const loadBlogs = async () => {
      const res = await getBlogBy(user?._id as string)
      const newBlogList = res
      //(newBlogList)
      setBlogList(newBlogList)
    }
    loadBlogs()
  }, [setBlogList,setLoc,getBlogBy])

  const content = blogList?.map(el => {
    //(blogList)
    return (
      <div key={el._id} className=' py-4'>
        <Blog blog={el} />
      </div>
    )
  })


  return !blogList ? (
    <Spinner />) : blogList.length === 0 ? (<main>
      <div className=' w-full justify- text-xl items-center text-center text-gray-100 mt-10  align-top'>
        <ProfileCard userShown={user as User}/>
        <h1 className='p-6'>You have not posted any vBlogs yet!</h1>
        <Link href={'/makeBlog'}>
          <button className="mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog now!</button>
        </Link>
      </div>
    </main>) : (
    <main>
        <div className='profile grid lg:grid-flow-col-dense lg:grid-cols-4 lg:grid-rows-1 h-screen overflow-hidden p-2'>
          <div className=' col-span-1 w-fit z-10 overflow-hidden flex justify-start items-start'>
          <ProfileCard userShown={user as User}/>
          </div>
          <div className=' text-slate-100 col-span-3 overflow-y-scroll w-full flex flex-col items-end px-8'><div className='w-full'>{content}</div>
          <div className=' w-full justify-center text-xl items-center text-center text-gray-100 mt-10 pb-10'>
        <h1>Post more vBlogs!</h1>
        <Link href={'/makeBlog'}>
          <button className="mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog now!</button>
        </Link>
      </div>
      </div>
        </div>
        
    </main>
  )
}

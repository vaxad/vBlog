"use client"
import { getAllBlogs, getBlogBy, getBlogs } from '@/lib/blog'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/usercontext'
import Spinner from './components/Spinner'
import Blog from './components/Blog'
import { BlogPost } from '@/types'
import Link from 'next/link'

export default function ViewBlogs() {
  const { setLoc, user } = useContext(UserContext)
  const [blogList, setBlogList] = useState<BlogPost[] | null>(null)

  let content = blogList?.map(el => {
    console.log(blogList)
    return (
      <div key={el._id} className=' py-4'>
        <Blog blog={el} />
      </div>
    )
  })

  useEffect(() => {
    setLoc('profile')
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    const res = await getBlogBy(user?._id as string)
    const newBlogList = res
    console.log(newBlogList)
    setBlogList(newBlogList)
  }


  return !blogList ? (
    <Spinner />) : blogList.length === 0 ? (<main>
      <div className=' w-full justify- text-xl items-center text-center text-gray-100 mt-10'>
        <h1>You have not posted any vBlogs yet!</h1>
        <Link href={'/makeBlog'}>
          <button className="mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:text-indigo-700 hover:bg-white lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Make a vBlog now!</button>
        </Link>
      </div>
    </main>) : (
    <main>
      <div className=' text-slate-100'>{content}</div>
    </main>
  )
}

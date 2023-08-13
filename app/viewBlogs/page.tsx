"use client"
import { getAllBlogs, getBlogs } from '@/lib/blog'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/usercontext'
import Spinner from './components/Spinner'
import Loading from './loading'
import { BlogPost } from '@/types'
import Blog from '../profile/components/Blog'

export default function ViewBlogs() {
    const {setLoc} =useContext(UserContext)

    const [blogList,setBlogList]=useState<BlogPost[]>([])

    useEffect(() => {
      setLoc('blogs')
      const loadBlogs=async()=>{
        const res = await getBlogs()
        setBlogList(res)
      }
        loadBlogs()
    }, [setLoc,setBlogList,getBlogs])

    

   const loadMore=async()=>{
    setBlogList([])
    const res = await getAllBlogs()
    const newBlogList=res
    setBlogList(newBlogList)
   }
   const content = blogList?.map(el=>{
    return(
        <div key={el._id} className=' py-6 w-full flex justify-center items-center'>
          <div className='w-10/12 hover:scale-110 transition-all'>
        <Blog  blog={el}/>
        </div>
        </div>
    )
})
  return blogList.length===0?(<Spinner></Spinner>):(
    <main className=' overflow-x-hidden'>
    <div className=' text-slate-100'>{content}</div>
    <div className=' flex items-center justify-center py-5 '>
  <button onClick={()=>loadMore()} className="text-white block w-8/12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Load more</button>
  </div>
    </main>   
  )
}

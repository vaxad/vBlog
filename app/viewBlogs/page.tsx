"use client"
import { getAllBlogs, getBlogs } from '@/lib/blog'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/usercontext'
import Spinner from './components/Spinner'
import Blog from './components/Blog'
import Loading from './loading'

export default function ViewBlogs() {
    const {blogList,setBlogList,setLoc} =useContext(UserContext)

    let content = blogList?.map(el=>{
      console.log(blogList)
        return(
            <div key={el._id} className=' py-4'>
            <Blog  blog={el}/>
            </div>
        )
    })

    useEffect(() => {
      setLoc('blogs')
      if(!blogList){
        loadBlogs()
      }
    }, [])

    const loadBlogs=async()=>{
      setBlogList(null)
      const res = await getBlogs()
      const newBlogList=res
      setBlogList(newBlogList)
    }
    

   const loadMore=async()=>{
    setBlogList(null)
    const res = await getAllBlogs()
    const newBlogList=res
    setBlogList(newBlogList)
   }
    
  return !blogList?(
  <Spinner/>):(
    <main>
    <div className=' text-slate-100'>{content}</div>
    <div className=' flex items-center justify-center py-5 '>
  <button onClick={()=>loadMore()} className="text-white block w-8/12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Load more</button>
  </div>
    </main>   
  )
}

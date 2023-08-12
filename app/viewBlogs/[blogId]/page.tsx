"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Suspense } from 'react'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { getUser } from '@/lib/user'
import { BlogPost, User } from '@/types'
import { getBlog } from '@/lib/blog'
import { UserContext } from '@/app/context/usercontext'
import ViewBlog from '../components/ViewBlog'
import Spinner from '../components/Spinner'


// export async function generateMetadata(
//     { params: {blogId} }: Params,
//     parent?: ResolvingMetadata
//   ): Promise<Metadata> {
//     const {token}=useContext(UserContext)
//     const blogData:Promise<BlogPost>=getBlog(blogId)
//     const blog = await blogData
//     if(!blog){
//       return{
//         title:"Oops! Not Found",
//       }
//     }else{
//     return {
//       title: blog.title,
//       description: blog.content
//     }
//   }
//   }
  
  type Params = {
      params: {
          blogId:string
      }
  }
  export default function Blog({params:{blogId}}:Params) {
    const {token,user,setLoc}=useContext(UserContext)
    const [userShown,setUserShown]=useState<User>()
    const [blog,setBlog]=useState<BlogPost>()
    
    useEffect(() => {
      setLoc('blogs')
      const loadData=async()=>{
        const blogData:BlogPost= await getBlog(blogId)
      setBlog(blogData)
      const userShownData=await getUser((blogData as BlogPost).creator)
      setUserShown(userShownData)
      }
      loadData()
    }, [getBlog,getUser,setBlog,setUserShown,setLoc])
    
    

    
    return !(userShown&&blog&&user)?(<Spinner/>):(
      <main>
        <ViewBlog blog={blog} me={user as User} user={userShown}/>
      </main>
  )
}


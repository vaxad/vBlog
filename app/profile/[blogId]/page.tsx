"use client"
import React, { useContext, useState } from 'react'
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
  export default async function Blog({params:{blogId}}:Params) {
    const {token,user}=useContext(UserContext)
    const blogData= await getBlog(blogId)
    const blog: BlogPost= blogData
    const userShownData=await getUser(blog?.creator)
    const userShown:User=userShownData

    
    return !(userShown&&blog&&user)?(<Spinner/>):(
      <main>
        <ViewBlog blog={blog} me={user as User} user={userShown}/>
      </main>
  )
}


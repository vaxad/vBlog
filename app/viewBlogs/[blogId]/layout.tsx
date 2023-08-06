"use client"
import { useContext } from 'react'
import '../../globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { UserContext } from '@/app/context/usercontext'
import { BlogPost } from '@/types'
import { getBlog } from '@/lib/blog'


type Params = {
    params: {
        blogId:string
    }
}

export async function generateMetadata(
    { params: {blogId} }: Params,
    parent?: ResolvingMetadata
  ): Promise<Metadata> {
    const blogData=await getBlog(blogId)
    const blog = blogData
    if(!blog){
      return{
        title:"Oops! Not Found",
      }
    }else{
    return {
      title: blog.title,
      description: blog.content
    }
  }
  }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
        {children}
    </main>
        
  )
}

import { BlogPost, User } from '@/types'
import React, { useState } from 'react'
import Comments from './Comments'
import { likeBlog, unlikeBlog } from '@/lib/blog'
import Spinner from './Spinner'
import LikeBlog from './LikeBlog'

type Props = {
    blog:BlogPost,
    user:User,
    me: User
}
export default function ViewBlog({blog,user,me}:Props) {


    const content = blog.tags.map((e:string)=>{
        return(
            <span key={e} className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{e}</span>
        )
    }
    )
    

  return !(user&&blog&&me)?(<Spinner/>):(
    <main className=' flex items-center justify-center'>
        <div className=' w-9/12 m-5'>
      <article className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border">
      <div className="flex pb-6 items-center justify-between">
        <div className="flex">
          <div className="inline-block mr-4">
            <img className="rounded-full max-w-none w-12 h-12" src="/pfp3.jpg" />
          </div>
          <div className="flex flex-col">
            <div>
              <div className="inline-block text-lg font-bold dark:text-white">{user?.name}</div>
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              {new Date(blog.date.toString()).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold dark:text-white">
        {blog.title}
      </h2>
      <div className="py-4">
        
      </div>
      <p className="dark:text-slate-200 break-words">
        {blog.content}
      </p>
      <div className="py-4 flex justify-between">
        <div>
           <LikeBlog blog={blog} me={me}/>
        </div>
        <div>
        {content}
        </div>
      </div>
      <Comments blog={blog} me={me} user={user}/>
    </article>
    </div>
    </main>
  )
}

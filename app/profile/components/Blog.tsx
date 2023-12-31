"use client"
import { getUser } from '@/lib/user'
import { BlogPost, User } from '@/types'
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner'
import Link from 'next/link'
import Dropdown from './Dropdown'
import { getMe } from '@/lib/auth'

type Props = {
    blog : BlogPost
}
export default function Blog({blog}:Props) {
    const [creator,setCreator]=useState<User>()
    const [res2,setRes2]=useState<User>()

    
   useEffect(() => {
    const loadData=async()=>{
      const res:User = await getUser(blog.creator);
      setCreator(res)  
      const resp:User = await getMe('')
      //(resp)
      setRes2(resp)
    }
     loadData()
   }, [setCreator,setRes2])
    

    const content = blog.tags.map(e=>{
        return(
            <span key={e} className=" bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 my-1 rounded dark:bg-blue-900 dark:text-blue-300">{e}</span>
        )
    })
  return !(creator&&res2)?(<main>
    <Spinner/>
    </main>):(
    <main >
    <div className=' flex items-center justify-center'>
        
<div id='blogCard' className=" w-full p-6 bg-white border hover:bg-indigo-600 hover:text-slate-900 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div className='flex justify-between'>
    <Link href={`/viewBlogs/${blog._id}`}>
    <div className='flex py-2'>
    <div className="align-middle">
            <img className="rounded-full max-w-none w-12 h-12" src="/pfp3.jpg" />
    </div>
        <div className=' items-end flex px-2'>
        <h5 className="mb-2 align-middle lg:text-2xl text-lg font-bold text-gray-900 dark:text-white">{blog.title}</h5>
        </div>
        </div>
        </Link>
        <div className='block'>

      {/* <h1 className=' text-white' id="dropdownDefaultButton" data-dropdown-toggle="dropdown">...</h1> */}

      {(creator._id===res2._id)&&<Dropdown blog={blog}/>}


      </div>
        </div>

        <Link href={`/viewBlogs/${blog._id}`}>
    <p className="mb-3 lg:text-lg text-sm font-normal text-gray-700 dark:text-gray-400 block break-words">{blog.content.length>400?blog.content.slice(0,400)+"...":blog.content}</p>
    
    <div className=' flex lg:flex-row flex-col my-2 justify-between'>
    <div>
        <div className="inline-flex items-center">
          <span className="mr-2">
            <svg className=" fill-sky-600" style={{width: 24, height: 24}} viewBox="0 0 24 24">
              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
              </path>
            </svg>
          </span>
          <span className="text-lg font-bold text-slate-200">{blog.likes.length}</span>
        </div>
        <div className="inline-flex items-center mx-4">
          <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg"  className=" fill-sky-600" style={{width: 24, height: 24}} viewBox="0 0 48 48">
            <path 
          d="M37,39H11l-6,6V11c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,36.3,40.3,39,37,39z"/>
          </svg>
          </span>
          <span className="text-lg font-bold text-slate-200">{blog.comments.length}</span>
        </div>
        </div>
    <div className='my-2 flex flex-wrap'>
    {content}
    </div>
    </div>
    </Link>
    <div>
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Posted by <Link href={`/profile/${blog.creator}`} className=" text-white hover:text-blue-100">{creator?creator.name:'an User'}</Link> on {new Date(blog.date.toString()).toLocaleString()}
    </span>
    </div>
    
</div>

</div>
</main>

  )
}

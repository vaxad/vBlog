"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/usercontext';
import { useRouter } from 'next/navigation';
import { postBlog } from '@/lib/blog';
import Spinner from '../viewBlogs/components/Spinner';

export default function MakeBlog() {
  const [visibility, setVisibility]=useState(true)
  const {user} = useContext(UserContext)
  const route = useRouter()
  const [title, setTitle]=useState('')
  const [content, setContent]=useState('')
  const [tags, setTags]=useState('')

  const handleChange = () =>{
  const checkbox = document.getElementById('checkbox') as HTMLInputElement | null;
    //(checkbox?.checked)
    if(checkbox?.checked){
      setVisibility(true)
    }else{
      setVisibility(false)
    }
  }

  useEffect(() => {
    if(!user){
      route.replace('/login')
    }
  }, [user,route])

  const handleSubmit=async()=>{
    const str=tags.replaceAll(" ","")
    var arr:string[]=str.split(",")
    arr=arr.filter(e=>e!=="")
    const res=await postBlog({creator:user?._id as string,title,content,tags:arr, public:visibility.toString()})
    if(res){
      route.push('/')
    }else{
      alert('something went wrong please try again')
    }
  }
  

  return !user?(<><Spinner/></>):(
    <main className=' p-10'>
      <div className="mb-6">
    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Creator</label>
    <input type="text" id="base-input" required disabled={true} value={user?.name} placeholder='My first vBlog' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
        <div className="mb-6">
    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text" id="base-input" required value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='My first vBlog' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
<div className="mb-6">
    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
    <textarea id="message" rows={17} required  value={content} onChange={(e)=>setContent(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="As I looked up at the hazy sky with tears rolling down my cheeks..."></textarea>

</div>
<div>
    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
    <input placeholder='Poetry, Literature' value={tags} onChange={(e)=>setTags(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
<div>
<label className="relative inline-flex items-center cursor-pointer my-4">
  <input id='checkbox' type="checkbox" onChange={handleChange} defaultChecked={true} className="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{visibility?"Public":"Private"}</span>
</label>
</div>
<div className=' flex items-center justify-center pb-5'>
  <button onClick={()=>{handleSubmit()}} className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post vBlog</button>
  </div>

</main>

  )
}

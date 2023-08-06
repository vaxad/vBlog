"use client"
import { UserContext } from '@/app/context/usercontext'
import { getCommentsAbout, postCommentAbout } from '@/lib/comment'
import { BlogPost, Comments, User } from '@/types'
import React, { useContext, useEffect, useState } from 'react'
import Comment from './Comment'

type Props={
    id:string,
    blog:BlogPost,
    me:User
}
export default function PostComment({id,blog,me}:Props) {
  const {comments, setComments} = useContext(UserContext)
    const [postComment,setPostComment]=useState('')

    const handleComment=async()=>{
        if(postComment.replaceAll(' ','')!==''){
            const res:Comments = await postCommentAbout(id,postComment)
            const resData:Comments=res
            setPostComment('')
            const cmnts=comments
            cmnts?.push(res)
            setComments(cmnts)
            // alert('comment posted')
            
        }
    }

  useEffect(() => {
    getcmnts()
    return () => {
      // Anything in here is fired on component unmount.
      setComments(null)
    }
  }, [])

  const getcmnts = async () => {

    const res = await getCommentsAbout(blog._id)
    console.log(res)
    const resData = res
    setComments(resData)
  }

  const content = comments?.map((e) => {
      return(
        <Comment e={e} me={me}/>
      )
  })
  return (
    <main>
        <div className="relative">
        <input
          className="pt-2 pb-2 pl-3 w-full h-11 dark:text-slate-100 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-300 dark:placeholder:text-slate-300 font-medium pr-20"
          type="text" value={postComment} onChange={e=>{setPostComment(e.target.value)}} placeholder="Write a comment" />
        <span onClick={()=>{handleComment()}} className="flex absolute right-3 top-2/4 -mt-3 items-center">
          <svg className={`fill-blue-500 ${postComment.replaceAll(' ','')===''?'fill-slate-400':'fill-slate-50'}`} style={{width: 24, height: 24}} viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
          </svg>
        </span>
      </div>
      <div className="pt-6">
        {content}
      </div>
    </main>
  )
}

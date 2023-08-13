"use client"
import { UserContext } from '@/app/context/usercontext'
import { getCommentsAbout, postCommentAbout } from '@/lib/comment'
import { BlogPost, Comments, User } from '@/types'
import React, { JSXElementConstructor, useContext, useEffect, useState } from 'react'
import Comment from './Comment'

type Props={
    id:string,
    blog:BlogPost,
    me:User
}
export default function PostComment({id,blog,me}:Props) {
  const [comments, setComments]= useState<Comments[]>([])
    const [postComment,setPostComment]=useState('')
    const [content,setContent]=useState([<></>])

  useEffect(() => {
    const getcmnts = async () => {

      const res = await getCommentsAbout(blog._id)
      //(res)
      const resData:Comments[] = res
      setComments(resData)
      setContent(resData.map((e) => {
        return(
          <Comment key={e._id} e={e} me={me}/>
        )
    }))
    }
    getcmnts()
    return () => {
      // Anything in here is fired on component unmount.
      setComments([])
    }
  }, [setComments,getCommentsAbout,setContent])

  

  const handleComment=async()=>{
    setPostComment('')
      if(postComment.replaceAll(' ','')!==''){
          const res = await postCommentAbout(id,postComment)
          const resData:Comments=res
          //(resData)
          const cmnts:Comments[]=(comments as Comments[])
          cmnts.push(resData)
          //(cmnts)
          setComments(cmnts)
          setContent(cmnts.map((e) => {
            return(
              <Comment key={e._id} e={e} me={me}/>
            )
        }))
          // alert('comment posted')
      }
  }
  return (
    <main>
        <div className="relative">
          <form>
        <input
          className="pt-2 pb-2 pl-3 w-full h-11 dark:text-slate-100 lg:text-base text-sm bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-300 lg:placeholder:text-base placeholder:text-xs dark:placeholder:text-slate-300 font-medium pr-20"
          type="text" value={postComment} onChange={e=>{setPostComment(e.target.value)}} placeholder="Write a comment" />
          
        <button type='submit' onClick={(e)=>{e.preventDefault() ;handleComment()}} className="flex absolute right-3 top-2/4 -mt-3 items-center">
          <svg className={`fill-blue-500 ${postComment.replaceAll(' ','')===''?'fill-slate-400':'fill-slate-50'}`} style={{width: 24, height: 24}} viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
          </svg>
        </button>
        </form>
      </div>
      <div className="pt-6">
        {content}
      </div>
    </main>
  )
}

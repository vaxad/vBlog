import { likeBlog, unlikeBlog } from '@/lib/blog'
import { BlogPost, User } from '@/types'
import React, { useState } from 'react'

type Props = {
    blog:BlogPost,
    me:User
}
export default function LikeBlog({blog, me}:Props) {

    const [like,setLike] =useState(blog.likes.includes(me._id)?'fill-rose-400':'fill-white')
    const [likeCount,setLikeCount]=useState(blog.likes.length)
    
    const handleLike = async() => {
        if(like==='fill-rose-400'){
            setLike('fill-white')
            setLikeCount(likeCount-1)
            const res = await unlikeBlog(blog._id)

        }else{
            setLike('fill-rose-400')
            setLikeCount(likeCount+1)
            const res = await likeBlog(blog._id)
        }
    }
  return (
    <div className="inline-flex items-center" onClick={e=>handleLike()}>
          <span className="mr-2">
            <svg className={like} style={{width: 24, height: 24}} viewBox="0 0 24 24">
              <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
              </path>
            </svg>
          </span>
          <span className="text-lg font-bold text-slate-200">{likeCount}</span>
        </div>
  )
}

import { Comments, User } from '@/types'
import React, { useState } from 'react'
import Spinner from './Spinner'
import Link from 'next/link'
import { likeComment, unlikeComment } from '@/lib/comment'

type Props = {
    e:Comments,
    me:User
}

export default function Comment({e, me}:Props) {


    const [like, setLike] = useState(e.likes.includes(me._id))
    const [likeCount, setLikeCount] = useState(e.likes.length)

    const handleLike = async () => {
      if (like) {
        setLike(false)
        setLikeCount(likeCount - 1)
        const res = await unlikeComment(e._id)

      } else {
        setLike(true)
        setLikeCount(likeCount + 1)
        const res = await likeComment(e._id)
      }
    }

    return !e.commentor ? (<Spinner />) : (
      <div className="media flex pb-4">
        <a className="mr-4" href="#">
          <img className="rounded-full max-w-none w-12 h-12" src="/pfp4.jpg" />
        </a>
        <div className="media-body">
          <div>
            <Link className="inline-block lg:text-base text-sm font-bold mr-2 text-slate-200" href={`/profile/${e.by}`}>{e.commentor.name}</Link>
            <span className="text-slate-500 dark:text-slate-300 lg:text-base text-sm">{new Date(e.date.toString()).toLocaleDateString()}</span>
          </div>
          <p className='text-slate-200 lg:text-base text-xs'>{e.content}</p>
          <div className="mt-2 flex items-center">
            <div className="inline-flex items-center py-2 mr-3" onClick={()=>{handleLike()}}>
              <span className="mr-2">
                <svg className={`${like?'fill-rose-400':'fill-white'}`} style={{ width: 22, height: 22 }}
                  viewBox="0 0 24 24">
                  <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                  </path>
                </svg>
              </span>
              <span className="text-base font-bold text-slate-300">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    )
}

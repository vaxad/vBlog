"use client"
import { getCommentsAbout } from '@/lib/comment'
import { BlogPost, Comments, User } from '@/types'
import React, { useContext, useEffect } from 'react'
import PostComment from './PostComment'
import { UserContext } from '@/app/context/usercontext'
import Spinner from './Spinner'
import Comment from './Comment'

type Props = {
  blog: BlogPost,
  user: User,
  me: User
}


export default async function Comments({ blog, user, me }: Props) {
  // const [comments,setComments]= useState<Comments[]|null>(null)
  const { comments, setComments } = useContext(UserContext)
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

  return !comments ? (<Spinner />) : (
    <main>
      <PostComment id={blog._id} blog={blog} me={me} />
    </main>
  )
}

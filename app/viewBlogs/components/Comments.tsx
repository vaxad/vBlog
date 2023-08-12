"use client"
import { BlogPost, Comments, User } from '@/types'
import React from 'react'
import PostComment from './PostComment'
type Props = {
  blog: BlogPost,
  user: User,
  me: User
}


export default async function Comments({ blog, user, me }: Props) {

  return (
    <main>
      <PostComment id={blog._id} blog={blog} me={me} />
    </main>
  )
}

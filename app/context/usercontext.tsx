"use client"
import { getBlogs } from "@/lib/blog";
import { BlogPost, User, Comments as CMT } from "@/types";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface UserContextInt {
    user: User|null,
    setUser: Dispatch<SetStateAction<User|null>>,
    token:string | null,
    setToken: Dispatch<SetStateAction<string|null>>,
    blogList:BlogPost[]|null,
    setBlogList:Dispatch<SetStateAction<BlogPost[]|null>>,
    comments:CMT[]|null,
    setComments:Dispatch<SetStateAction<CMT[]|null>>,
    commentor:User|null,
    setCommentor:Dispatch<SetStateAction<User|null>>,
    loc:string,
    setLoc:Dispatch<SetStateAction<string>>,
    del:boolean,
    setDel:Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    user: null,
    setUser : (user:User) => {},
    token : '',
    setToken : (token:string) => {},
    blogList : null,
    setBlogList : (blogList:BlogPost[])=>{},
    comments:null,
    setComments: (comments:CMT[])=>{},
    commentor:null,
    setCommentor: (commentor:User)=>{},
    loc:'',
    setLoc:(loc:string)=>{return ''},
    del:false,
    setDel:(del:boolean)=>{return false}
} as UserContextInt

export const UserContext =createContext(defaultState)

type UserProviderProps = {
    children: ReactNode
}

export default function UserProvider({children}:UserProviderProps) {
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = useState<string|null>('');
    const [blogList, setBlogList] = useState<BlogPost[]|null>(null);
    const [comments, setComments]= useState<CMT[]|null>(null)
    const [commentor, setCommentor]= useState<User|null>(null)
    const [loc,setLoc]=useState<string>('')
    const [del,setDel]=useState<boolean>(false)


    // useEffect(() => {
    
    //   }, [])

    // useEffect(() => {
    //   if(blogList===null){
    //     getBlogs
    //   }
    // }, [user])
    
    // const getSomeBlogs = async()=>{
    //     const res = await getBlogs()
    //     setBlogList(res)
    // }



    return (
        <UserContext.Provider value={{user, setUser, token, setToken, blogList, setBlogList, comments, setComments,commentor,setCommentor,loc,setLoc,del,setDel}}>
            {children}
        </UserContext.Provider>
    )
}

// {
//     name: '',
//     email: '',
//     blogs: [],
//     followers: [],
//     following: [],
//     date: new Date(),
//     _id: ''
// }
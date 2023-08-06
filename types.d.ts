import { ObjectId } from "mongoose"

type BlogPost = {
    creator : string,
    title : string,
    content : string,
    tags : string[],
    likes : string[],
    date : Date,
    comments : string[],
    public : string,
    _id : string
}

type User = {
    name : string,
    email : string,
    blogs : string[],
    followers : string[],
    following : string[],
    date: Date,
    _id: string
}

type Comments = {
    _id:string
    commentor:User,
    content:string,
    about:string,
    by:string,
    date:Date,
    likes:string[]
}
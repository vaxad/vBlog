
type BlogPost = {
    creator:string,
    title:string,
    content:string,
    tags:string[],
    public:string
}

type EditBlog = {
    id:string,
    title:string,
    content:string,
    tags:string[],
    public:string
}

    let token=''
if (typeof window !== 'undefined') {
    // do localStorage stuff here
    token=localStorage.getItem('token') as string
  }

export async function postBlog(data:BlogPost) {
    try{
    const res =  await fetch("https://vblog-qz53.onrender.com/api/blogs/",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({
                creator:data.creator, title:data.title, content:data.content, public:data.public,tags:data.tags
            })
        })
        if(res.ok){
        const result = await res.json()
        return true
        }else{
            return false
        }
    }catch(e){
        //(e)
    }
  
}

export async function editBlog(data:EditBlog) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/${data.id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            },
            body: JSON.stringify({
                 title:data.title, content:data.content, public:data.public,tags:data.tags
            })
        })
        if(res.ok){
        const result = await res.json()
        return true
        }else{
            return false
        }
    }catch(e){
        //(e)
    }
  
}

export async function getBlogs() {
    
    try{
    const res =  await fetch("https://vblog-qz53.onrender.com/api/blogs/",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function getBlog(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/${id}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function deleteBlog(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function getBlogBy(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/by/${id}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function getAllBlogs() {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/all`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function likeBlog(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/like/${id}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function unlikeBlog(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/blogs/unlike/${id}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // //(result)
        return result
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}
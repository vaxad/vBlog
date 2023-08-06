

let token=''
if (typeof window !== 'undefined') {
    // do localStorage stuff here
    token=localStorage.getItem('token') as string
  }

export async function postCommentAbout(id:string,content:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/comment/${id}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            },
            body :JSON.stringify({
                content:content
            })
        })

        if(res.ok){
        const result = await res.json()
        // console.log(result)
        return result
        }else{
            return null
        }
    }catch(e){
        console.log(e)
    }
  
}

export async function getCommentsAbout(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/comment/about/${id}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })

        if(res.ok){
        const result = await res.json()
        // console.log(result)
        return result
        }else{
            return null
        }
    }catch(e){
        console.log(e)
    }
  
}

export async function likeComment(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/comment/like/${id}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // console.log(result)
        return result
        }else{
            return null
        }
    }catch(e){
        console.log(e)
    }
  
}

export async function unlikeComment(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/comment/unlike/${id}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        if(res.ok){
        const result = await res.json()
        // console.log(result)
        return result
        }else{
            return null
        }
    }catch(e){
        console.log(e)
    }
  
}
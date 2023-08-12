

type UserSignup = {
    "name":string,
    "email":string,
    "password":string
}

type UserLogin = {
    "email":string,
    "password":string
}

let token: string

export async function signup(data:UserSignup) {
    try{
    const res =  await fetch("https://vblog-qz53.onrender.com/api/auth/",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email:data.email, password:data.password, name:data.name
            })
        })
        if(res.ok){
        const result = await res.json()
        localStorage.setItem("token", result.authToken)
        token=result.authToken
        return (result.authToken)
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}

export async function login(data:UserLogin) {
    try{
    const res =  await fetch("https://vblog-qz53.onrender.com/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email:data.email, password:data.password
            })
        })
        if(res.ok){
        const result = await res.json()
        localStorage.setItem("token",result.authToken)
        token=result.authToken
        return (result.authToken)
        }else{
            return null
        }
        
    }catch(e){
        //(e)
    }
}

export function logout (){
    try{
    localStorage.setItem("token",'')
    token=''
    return ''
    //("logout")
    }catch(e){
      //(e)
    }

  }

  export async function getMe(authToken:string) {
    try{
        let Token=token as string
        if(Token===""||typeof Token==="undefined"){
            Token=authToken
        }
        if(Token===""||typeof Token==="undefined"){
            Token=localStorage.getItem('token') as string
        }
        //(Token)
    const res =  await fetch("https://vblog-qz53.onrender.com/api/auth/",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':Token
            }
        })
        //(res)
        if(res.ok){
        const result = await res.json()
        return (result)
        }else{
            return null
        }
    }catch(e){
        //(e)
    }
  
}
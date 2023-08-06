

type UserSignup = {
    "name":string,
    "email":string,
    "password":string
}

type UserLogin = {
    "email":string,
    "password":string
}

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
        return (result.authToken)
        }else{
            return null
        }
    }catch(e){
        console.log(e)
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
        return (result.authToken)
        }else{
            return null
        }
        
    }catch(e){
        console.log(e)
    }
}

export function logout (){
    try{
    localStorage.setItem("token",'')
    return ''
    console.log("logout")
    }catch(e){
      console.log(e)
    }

  }

  export async function getMe(token:string) {
    try{
        console.log(token)
    const res =  await fetch("https://vblog-qz53.onrender.com/api/auth/",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':token
            }
        })
        console.log(res)
        if(res.ok){
        const result = await res.json()
        return (result)
        }else{
            return null
        }
    }catch(e){
        console.log(e)
    }
  
}
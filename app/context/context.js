"use client"
import { createContext, useState } from "react";

export const vContext = createContext(null);

export default function Context({ children }) {

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const item = localStorage.getItem('key')
  }
    const [token, setToken] = useState("");

    const signup = async(data) => {
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
          const result = await res.json()
          localStorage.setItem("token", result.authToken)
          setToken(result.authToken)
          const user = await fetch("https://vblog-qz53.onrender.com/api/auth/",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': token
            }
        })
        const me=await user.json()
        console.log(me)
      }catch(e){
          console.log(e)
      }
  }

  const login = async(data) => {
   console.log(data)
    try{
    const res =  await fetch("https://vblog-qz53.onrender.com/api/auth/login",{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email:data.email, password:data.pass
            })
        })
        const result = await res.json()
        console.log(result)
        localStorage.setItem("token", result.authToken)
        setToken(result.authToken)
        const user = await fetch("https://vblog-qz53.onrender.com/api/auth/",{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': token
            }
        })
        const me=await user.json()
        console.log(me)
    }catch(e){
        console.log(e)
    }
}

  const logout = () =>{
    try{
    localStorage.setItem("token",false)
    setToken("")
    console.log("logout")
    }catch(e){
      console.log(e)
    }

  }
  
    return (
      <vContext.Provider value={{ token, signup,logout, login }}>
        {children}
      </vContext.Provider>
    );
  }
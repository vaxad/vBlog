
let token=''
if (typeof window !== 'undefined') {
    // do localStorage stuff here
    token=localStorage.getItem('token') as string
  }

export async function getUser(id:string) {
    try{
    const res =  await fetch(`https://vblog-qz53.onrender.com/api/user/${id}`,{
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
export function featchorderbyuserid(id){
    return new Promise(async(resolve)=>{
        const response = await fetch(`http://localhost:8080/order?user=${id}`)
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}


export function fetchuserinfo(loginuser){
    return new Promise(async(resolve)=>{

        const response = await fetch(`http://localhost:8080/user?${loginuser}`)
    const data = await response.json()
    console.log("dataapiuserapi" , data)
    resolve({data})
    })
}

export function updateUserprofile(update)
{
    console.log("userapiupdate" , update)
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/user/`+update.id,{

        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(update)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}
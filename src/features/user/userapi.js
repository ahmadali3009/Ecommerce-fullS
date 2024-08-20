export function featchorderbyuserid(userid){
    return new Promise(async(resolve)=>{
        const response = await fetch(`http://localhost:8080/order?userdetail.id=${userid}`)
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


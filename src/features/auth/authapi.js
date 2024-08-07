export function createuser(user){
    return new Promise(async(resolve)=>{
        const response = await fetch("http://localhost:8080/user",{

        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}
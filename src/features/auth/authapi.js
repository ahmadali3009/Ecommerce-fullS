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

export function checkuser(loginuser){
    return new Promise(async(resolve , reject)=>{
        let email = loginuser.email
        let password = loginuser.password

        const response = await fetch(`http://localhost:8080/user?email=${email}`)
    const data = await response.json()
    console.log("dataapi" , data)
    if(data.length)
        {
            if(password === data[0].password)
              {console.log("insideapiif" , data[0])
                resolve({data:data[0]})}
            else
            {
                reject({message:"worng credentials"})
            }
        }
        else
        {
            reject({message:"user not found"})
        }
    })
}
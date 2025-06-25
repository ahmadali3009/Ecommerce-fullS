export function currentorder(order){
    return new Promise(async(resolve)=>{
        const response = await fetch("http://localhost:8080/order",{

        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(order),
        credentials: 'include' // Include credentials (cookies)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}


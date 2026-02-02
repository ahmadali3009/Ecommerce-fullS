import { API_BASE } from '../../config';

export function currentorder(order){
    return new Promise(async(resolve)=>{
        const response = await fetch(`${API_BASE}/order`,{

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


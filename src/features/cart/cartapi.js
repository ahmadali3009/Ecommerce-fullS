export function addtocart(product){
    return new Promise(async(resolve)=>{
        const response = await fetch("http://localhost:8080/cart",{

        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(product)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}

export function fetchproductbyuserid(userid)
{
    console.log("cartapiuser" , userid)
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/cart?user=${userid}`)
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})

    })
}

export function updateCart(update)
{
    console.log("cartapiupdate" , update)
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/cart/${update.id}`,{

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

export function deleteCart(productid)
{
    console.log("cartapiupdate" , productid)
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/cart/${productid}`,{

        method: "DELETE",
        headers: {
            "Content-Type" : "application/json"
        },
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data:{id:productid}})
    })
}
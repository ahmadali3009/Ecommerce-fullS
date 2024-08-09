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
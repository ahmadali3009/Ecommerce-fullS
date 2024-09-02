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
    console.log("addtocartdatacheck" , data)
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
   

    const response = await fetch(`http://localhost:8080/cart/`+update.id,{

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

export function deleteCart(productid) {
    console.log("cartapiupdate", productid);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/cart/${productid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                // Handle cases where the response status is not 2xx
                if (response.status === 404) {
                    console.log(`Cart item with ID ${productid} not found`);
                    resolve({ data: { id: productid, message: "Not Found" } });
                } else {
                    console.error(`Failed to delete cart item with ID ${productid}`);
                    reject(new Error(`Failed to delete cart item with ID ${productid}`));
                }
            } else {
                // Try to parse the response as JSON
                let data;
                try {
                    data = await response.json();
                    console.log("dataapi", data);
                } catch (error) {
                    console.log("Response is not in JSON format");
                    data = { message: "Deleted successfully but no JSON response" };
                }
                resolve({ data: { id: productid, ...data } });
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
            reject(error);
        }
    });
}


export function resetCart(userid)
{
    return new Promise(async(resolve , reject)=>{
       let response = await fetchproductbyuserid(userid)

       let products = response.data
        console.log("resetCart", products)
       for(let product of products)
       {
        await deleteCart(product.id)
       }

    resolve({status:"success"})
    })
}

export function fetchallproducts() 
{
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                const response = await fetch("http://localhost:8080/products");
                const data = await response.json();
                resolve({data})
            })
}

export function fetchallproductscategories(filter) 
{   console.log("filterapiproduct", filter)
    
    // filter as a object {"category":"any producttype"}
    let queryString = "";
    for (let key in filter) {
        queryString += `${key}=${filter[key]}&`;
    }
    // queryString = queryString.slice(0, -1); // Remove trailing '&'

    console.log("qurrystring",queryString)
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                const response = await fetch('http://localhost:8080/products?'+queryString)
                const data = await response.json();
                console.log("api",data )
                resolve({data})
            })
}
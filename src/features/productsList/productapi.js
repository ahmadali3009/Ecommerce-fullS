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

export function fetchallproductscategories(filter , Sort , pagenation) 
{  
    
    let queryString = "";
    
    for (let key in filter) {
        const categoryValues = filter[key];
        if(categoryValues.length){
          const lastCategoryValue = categoryValues[categoryValues.length-1]
          queryString += `${key}=${lastCategoryValue}&`
        }
      }
      console.log("qurreystring" , queryString)

      for(let key in Sort){
        queryString += `${key}=${Sort[key]}&`
      }
      for(let key in pagenation){
        queryString += `${key}=${pagenation[key]}&`
      }
      return new Promise(async (resolve) =>{
        //TODO: we will not hard-code server URL here
        const response = await fetch('http://localhost:8080/products?'+queryString) 
        const data = await response.json()
        resolve({data})
      }
      );
    }

    export function fetchbrands() 
{
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                const response = await fetch("http://localhost:8080/brand");
                const data = await response.json();
                resolve({data})
            })
}
export function fetchcategories() 
{
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                const response = await fetch("http://localhost:8080/category");
                const data = await response.json();
                resolve({data})
            })
}

export function fetchproductdetailbyid(id) 
{
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                const response = await fetch(`http://localhost:8080/products/${id}`);
                const data = await response.json();
                resolve({data})
            })
}

export function createproduct(product){
  return new Promise(async(resolve)=>{
      const response = await fetch("http://localhost:8080/products",{

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


export function updateproduct(update)
{
    console.log("productapiupdate" , update)
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
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

export function fetchallproductscategories(filter,Sort,pagenation) {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10} 
    // TODO : on server we will support multi values in filter
   
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in Sort) {
    queryString += `${key}=${Sort[key]}&`;
  }
  for (let key in pagenation) {
    queryString += `${key}=${pagenation[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products?${queryString}`);
      
      if (!response.ok) {
        return reject(new Error('Failed to fetch products'));
      }
      
      const data = await response.json();
      const totalItems = response.headers.get('X-Total-Count'); // Correctly access the header
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      reject(error);
    }
  });
  
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
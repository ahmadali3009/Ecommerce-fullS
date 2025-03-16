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

export function fetchallproductscategories(filter, Sort, pagenation) {
    let queryString = '';

    // Handle filters
    console.log("tell me the structure of filter", filter)
    if (filter) {
        Object.keys(filter).forEach(key => {
            const values = filter[key];
            if (Array.isArray(values)) {
                values.forEach(value => {
                    queryString += `${key}=${encodeURIComponent(value)}&`;
                });
            }
        });
    }

    // Handle sort
    if (Sort && Sort._sort) {
        queryString += `_sort=${Sort._sort}&_order=${Sort._order || 'asc'}&`;
    }

    // Handle pagination
    if (pagenation) {
        queryString += `_page=${pagenation._page}&per_page=${pagenation.per_page}`;
    }

    console.log('Query string:', queryString); // Debug log

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/products?${queryString}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const totalItems = response.headers.get('X-Total-Count');
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
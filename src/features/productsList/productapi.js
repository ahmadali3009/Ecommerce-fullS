import { API_BASE } from '../../config';

export function fetchallproducts() 
{
        return new Promise (async (resolve)=>
            {
                const response = await fetch(`${API_BASE}/products`, {
                    credentials: 'include' // Include credentials (cookies)
                });
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
            const response = await fetch(`${API_BASE}/products?${queryString}`, {
                credentials: 'include' // Include credentials (cookies)
            });
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
        return new Promise (async (resolve)=>
            {
                const response = await fetch(`${API_BASE}/brand`, {
                    credentials: 'include' // Include credentials (cookies)
                });
                const data = await response.json();
                resolve({data})
            })
}
export function fetchcategories() 
{
        return new Promise (async (resolve)=>
            {
                const response = await fetch(`${API_BASE}/category`, {
                    credentials: 'include' // Include credentials (cookies)
                });
                const data = await response.json();
                resolve({data})
            })
}

export function fetchproductdetailbyid(id) 
{
        return new Promise (async (resolve)=>
            {
                const response = await fetch(`${API_BASE}/products/${id}`, {
                    credentials: 'include' // Include credentials (cookies)
                });
                const data = await response.json();
                resolve({data})
            })
}

export function createproduct(product){
  return new Promise(async(resolve)=>{
      const response = await fetch(`${API_BASE}/products`,{

      method: "POST",
      headers: {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify(product),
      credentials: 'include' // Include credentials (cookies)
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
   

    const response = await fetch(`${API_BASE}/user/`+update.id,{

        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(update),
        credentials: 'include' // Include credentials (cookies)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}
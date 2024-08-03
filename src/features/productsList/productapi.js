// export function fetchallproducts() 
// {
//     //TODO: we will not hard-code server URL here
//         return new Promise (async (resolve)=>
//             {
//                 const response = await fetch("http://localhost:8080/products");
//                 const data = await response.json();
//                 resolve({data})
//             })
// }

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
                const response = await fetch("http://localhost:8080/categories");
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
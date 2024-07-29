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

export function fetchallproductscategories(filter , Sort) 
{   console.log("Sortapiproduct", Sort)
    
    let queryString = "";
    
    for (let key in filter) {
        const categoryValues = filter[key];
        if(categoryValues.length){
          const lastCategoryValue = categoryValues[categoryValues.length-1]
          queryString += `${key}=${lastCategoryValue}&`
        }
      }
      for(let key in Sort){
        queryString += `${key}=${Sort[key]}&`
      }
      return new Promise(async (resolve) =>{
        //TODO: we will not hard-code server URL here
        const response = await fetch('http://localhost:8080/products?'+queryString) 
        const data = await response.json()
        resolve({data})
      }
      );
    }
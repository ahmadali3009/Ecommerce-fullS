
export function fectchAllOrderStatus() 
{
    //TODO: we will not hard-code server URL here
        return new Promise (async (resolve)=>
            {
                let response = await fetch('http://localhost:8080/orderstatus');
                const data = await response.json();
                resolve({data})
            })
}
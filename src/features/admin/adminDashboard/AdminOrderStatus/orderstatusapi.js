import { API_BASE } from '../../../../config';

export function fectchAllOrderStatus() 
{
        return new Promise (async (resolve)=>
            {
                let response = await fetch(`${API_BASE}/orderstatus`);
                const data = await response.json();
                resolve({data})
            })
}
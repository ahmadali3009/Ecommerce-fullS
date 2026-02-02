import { API_BASE } from '../../config';

export function featchorderbyuserid(){
    return new Promise(async(resolve)=>{
        const response = await fetch(`${API_BASE}/order/own/`,{
            credentials: 'include'
        })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}

export function fetchuserinfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_BASE}/users/self`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("dataapiuserapi", data);
        resolve({ data });
      } catch (error) {
        console.error("Error fetching user info:", error);
        reject(error);
      }
    });
  }
  

export function updateUserprofile(update)
{
    console.log("userapiupdate" , update)
    return new Promise(async(resolve , _reject)=>{
   

    const response = await fetch(`${API_BASE}/users/`+update.id,{

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

export function updateUser(update)
{
    console.log("userapiupdate" , update)
    return new Promise(async(resolve , _reject)=>{
   

    const response = await fetch(`${API_BASE}/users`,{

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
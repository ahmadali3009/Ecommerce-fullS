export function featchorderbyuserid(){
    return new Promise(async(resolve)=>{
        const response = await fetch(`http://localhost:8080/order/own/`)
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}

export function fetchuserinfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8080/users/self');
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
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/users/`+update.id,{

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
    return new Promise(async(resolve , reject)=>{
   

    const response = await fetch(`http://localhost:8080/users`,{

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
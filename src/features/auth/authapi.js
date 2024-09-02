export function createuser(user){
    return new Promise(async(resolve)=>{
        const response = await fetch("http://localhost:8080/user",{

        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    const data = await response.json()
    console.log("dataapi" , data)
    resolve({data})
    })
}

export function checkuser(loginuser) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginuser),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
    });
  }

export function updateUser(update)
{
    console.log("userapiupdate" , update)
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
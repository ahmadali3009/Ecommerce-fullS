export function createuser(user){
    return new Promise(async(resolve)=>{
        const response = await fetch("http://localhost:8080/auth/signup",{

        method: "POST",
        credentials: 'include', // Include credentials (cookies)
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
          credentials: 'include' // Include credentials (cookies)
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

  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:8080/auth/checkAuth', {
          credentials: 'include' // Include credentials (cookies)
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
      // TODO: on server it will only return some info of user (not password)
    });
  }
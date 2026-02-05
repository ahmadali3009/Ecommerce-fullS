import { API_BASE } from '../../config';

export function createuser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = data?.error || data?.message || response.statusText || 'Signup failed';
        reject(new Error(typeof message === 'string' ? message : JSON.stringify(message)));
        return;
      }
      resolve({ data });
    } catch (err) {
      reject(err);
    }
  });
}

export function checkuser(loginuser) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_BASE}/auth/login`, {
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
        const response = await fetch(`${API_BASE}/auth/checkAuth`, {
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
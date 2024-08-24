import React from 'react'
import { selectcheckuser } from '../../auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Adminprotected ({children}){
    const loginuser = useSelector(selectcheckuser)
    console.log("Adminprotected checkuser" , loginuser)
    if(!loginuser)
        {
          return  <Navigate to="/login" replace={true} ></Navigate>
        }
    if(loginuser && loginuser.role !== "admin")
        {
          return  <Navigate to="/login" replace={true} ></Navigate>

        }
        return children;
}

export default Adminprotected

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectuserinfo } from '../../user/userSlice'
function Adminprotected ({children}){
    const loginuser = useSelector(selectuserinfo)
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

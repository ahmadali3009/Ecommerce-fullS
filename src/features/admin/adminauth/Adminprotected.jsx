import React from 'react'
import { selectcreateuser } from '../../auth/authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Adminprotected ({children}){
    const loginuser = useSelector(selectcreateuser)
    if(!loginuser)
        {
            <Navigate to="/login" replace={true} ></Navigate>
        }
    if(loginuser && loginuser.role != "admin")
        {
            <Navigate to="/login" replace={true} ></Navigate>

        }
        return children;
}

export default Adminprotected

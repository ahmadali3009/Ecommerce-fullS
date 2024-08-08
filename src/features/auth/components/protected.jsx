import React from 'react'
import { selectcreateuser } from '../authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function Protected ({children}){
    const loginuser = useSelector(selectcreateuser)
    if(!loginuser)
        {
            <Navigate to="/login" ></Navigate>
        }
        return children;
}

export default Protected

import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from "react-router-dom";
 


const PrivateRoutes = ({children}) => {
const {token, loading} = useAuth();
if (loading) return <div>Loading...</div>
return token ? children : <Navigate to="/login"/>
  
}

export default PrivateRoutes

import { Navigate, Outlet } from 'react-router-dom'
import React, { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';



const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    // send jwt to API to see if it's valid
    let token = localStorage.getItem("x-auth-token");

    if (token) {
      fetch("/api/auth/protected", {
        method: 'GET',
        headers: {
          'x-auth-token': token,
        }
      })
        .then((res) => res.json())
        .then((json) => {
          if (json._id) {
            setIsAuthenticated(true)
          }
        })
        .catch((err) => {
          setIsAuthenticated(false)
        })
    } 
  }, [])

  return (
    isAuthenticated ? <Navigate to='/' /> : <Outlet /> 

  )
}

export default PrivateRoutes;
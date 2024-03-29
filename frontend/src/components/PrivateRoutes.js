import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext, useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from './AuthContext';



const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
            setLoading(false);
          }
        })
        .catch((err) => {
          setIsAuthenticated(false)
          setLoading(false);
        })
    } else {
      setLoading(false); // in case there is no token
    }
  }, [])

  if (loading) return (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  ); 

  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/login' />

  )
}

export default PrivateRoutes;
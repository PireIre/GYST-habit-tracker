import React, { useContext, useState} from "react";
import { Navbar } from "react-bootstrap";
import "./GystNavbar.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';



function GystNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  const [username, setUsername] = useState("")

  if (isAuthenticated) {
    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('x-auth-token')
      }})
      .then(res => res.json())
      .then(user => setUsername(user.name))
  }


  const handleLogout = () => {
    localStorage.removeItem("x-auth-token");
    navigate("/login")
    setIsAuthenticated(false)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/"><b>G</b>et <b>Y</b>our <b>S</b>hit <b>T</b>ogether</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {isAuthenticated &&
          <Navbar.Text>
            <div>{username}</div>
            <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={handleLogout} href="/login">Log out</div>
          </Navbar.Text>
        }
      </Navbar.Collapse>
    </Navbar>

  );
}

export default GystNavbar;

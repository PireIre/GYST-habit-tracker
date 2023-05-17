import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import "./GystNavbar.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';


function GystNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);


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
            <div>Ire Pire</div>
            <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={handleLogout} href="/login">Log out</div>
          </Navbar.Text>
        }
      </Navbar.Collapse>
    </Navbar>

  );
}

export default GystNavbar;

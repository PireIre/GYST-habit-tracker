import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authEndpoint = "/api/auth";
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    let user = {
      email: email,
      password: password,
    }

    fetch(authEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(token => {
        if (token.ok) {
          token.text().then(res => window.localStorage.setItem('x-auth-token', res))
          navigate("/")
        }
        else console.log(token.statusText)
      })
  }
  return (
    <div className="form-container">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className="form-group">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="form-control"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="form-group">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
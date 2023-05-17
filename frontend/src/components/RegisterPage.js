import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userEndpoint = "/api/user";
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    let user = {
      name: username,
      email: email,
      password: password,
    }

    fetch(userEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.ok) {
          const authToken = response.headers.get('x-auth-token');
          window.localStorage.setItem('x-auth-token', authToken)
          navigate('/');

        }
      })
  }

  return (
    <>
       <h1 className="login-title">Register</h1>
        <div className="form-container">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="form-group">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="form-group">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className="form-control"
          />
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

        <Form.Group controlId="formConfirmPassword" className="form-group">
          <Form.Label className="form-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="button">
          Submit
        </Button>
        <Form.Text className="text-muted">
           Already have an account? Login <a href="/login">here</a>.
          </Form.Text>
      </Form>
    </div>
    </>
  );
}

export default RegisterPage;

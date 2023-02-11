import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const HabitModal = ()  => {
  const habitsEndpoint = "/api/habit";

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addHabit = (habit) => {
    fetch(habitsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('x-auth-token')
      },
      body: JSON.stringify(habit),
    })
      .then(res => res.json())
  }

  const handleSubmit = (event) => {

    event.preventDefault();
    
    let habit = {
      action: event.target[0].value, 
      time: event.target[1].value,
      location: event.target[2].value,
    }

    addHabit(habit)
  }

  return (
    <>
      <Button className="new-habit-btn" variant="dark" onClick={handleShow}>
        New Habit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal with Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Habit</Form.Label>
              <Form.Control required placeholder="Run" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control required placeholder="20 minutes" type="number"/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Location</Form.Label>
              <Form.Control placeholder="Threadmill" />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Submit
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HabitModal;

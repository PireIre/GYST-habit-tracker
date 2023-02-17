import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const HabitModal = ({currentHabit, setCurrentHabit, showHabitModal, handleCloseHabitModal, handleShowHabitModalHabitModal, editHabitModal, setEditHabitModal})  => {

  const habitsEndpoint = "/api/habit";

  const handleAddHabitButtonClick = () => {
    setEditHabitModal(false)
    handleShowHabitModalHabitModal()
  }

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
      .then(habit => setCurrentHabit(habit))
  }

  const updateHabit = (habit) => {
    fetch(habitsEndpoint + "/" + currentHabit._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('x-auth-token')
      },
      body: JSON.stringify(habit),
    })
      .then(res => res.json())
      .then(habit => setCurrentHabit(habit))
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    let habit = {
      action: event.target[0].value, 
      time: event.target[1].value,
      location: event.target[2].value,
    }

    editHabitModal ? updateHabit(habit) : addHabit(habit)
  
  }

  const handleDeleteHabit = () => {

    console.log(currentHabit)

    try {
      fetch(habitsEndpoint + "/" + currentHabit._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': window.localStorage.getItem('x-auth-token')
        }
      })
        .then(res => res.json())
        .then(habit => setCurrentHabit(habit))

    } catch (error) {
      console.log("Could not delete the habit!" + error);
    }

    handleCloseHabitModal()
  }

  return (
    <>
      <Button className="new-habit-btn" variant="dark" onClick={handleAddHabitButtonClick}>
        New Habit
      </Button>

      <Modal show={showHabitModal} onHide={handleCloseHabitModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editHabitModal ? "Update Habit" : "New Habit" }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Habit</Form.Label>
              <Form.Control required placeholder="Run" defaultValue={editHabitModal ? currentHabit.action : ""} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control required placeholder="20 minutes" type="number" defaultValue={editHabitModal ? currentHabit.time : ""}/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Location</Form.Label>
              <Form.Control placeholder="Threadmill" defaultValue={editHabitModal ? currentHabit.location : ""}/>
            </Form.Group>
            <Button variant="secondary" onClick={handleCloseHabitModal}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCloseHabitModal}>
          {editHabitModal ? "Update" : "Submit" }

          </Button>
          {editHabitModal &&
             <Button variant="danger" onClick={handleDeleteHabit}>
                    Delete
            </Button>
          }
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HabitModal;

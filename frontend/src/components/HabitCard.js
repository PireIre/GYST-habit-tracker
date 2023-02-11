import React from "react"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HabitCard({ habit }) {
  const habitsEndpoint = "/api/habit";

  const handleDeleteHabit = (habitId) => {
    try {
      fetch(habitsEndpoint + "/" + habitId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': window.localStorage.getItem('x-auth-token')
        }
      })
        .then(res => res.json())

    } catch (error) {
      console.log("Could not delete the habit!" + error);
    }

  }

  return (
    <Row>
        <Col>
          <Card style={{ width: '160px', height: '160px' }}>
            <Card.Body>
              <Card.Title>{habit.action}</Card.Title>
              <Card.Text>{habit.time} min</Card.Text>
              <Card.Text>{habit.location}</Card.Text>
              <div onClick={() => handleDeleteHabit(habit._id)} style={{ color: "red", display: "inline", cursor: "pointer" }}>X</div>
            </Card.Body>
          </Card>
        </Col>
    </Row>
  );
}

export default HabitCard;
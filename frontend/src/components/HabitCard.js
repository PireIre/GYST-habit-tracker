import React, { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HabitCard() {
  const habitsEndpoint = "/api/habit";
  const [backendHabits, setBackendHabits] = useState("")

  const fetchHabits = async () => {
    try {
      fetch(habitsEndpoint)
        .then(res => res.json())
        .then(habits => {
          setBackendHabits(habits)
        })
    }
    catch (error) {
      console.log("Could not fetch the habits!" + error);
    }
  };

  const handleDeleteHabit = (habitId) => {
    console.log(habitId);

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

    fetchHabits();
  }


  useEffect(() => fetchHabits, [])

  return (
    <Row>
      {backendHabits && backendHabits.map((habit, i) =>
        <Col>
          <Card key={i} style={{ width: '11rem', margin: "10px 5px" }}>
            <Card.Body>
              <Card.Title>{habit.action}</Card.Title>
              <Card.Text>Length: {habit.time} min</Card.Text>
              <Card.Text>Where: {habit.location}</Card.Text>
              <div onClick={() => handleDeleteHabit(habit._id)} style={{ color: "red", display: "inline", cursor: "pointer" }}>X</div>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
}

export default HabitCard;
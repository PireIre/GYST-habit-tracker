import React, { useState } from "react"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HabitCard.css'



function HabitCard({ habit, setCurrentHabit, setEditHabitModal, handleShowHabitModalHabitModal, updateHabit, days, currentHabit }) {

  const backendDates = new Set(habit.days);

  const handleDotClick = (date) => {

    if (backendDates.has(date)) {
      backendDates.delete(date);
    } else {
      backendDates.add(date);
    }
    habit.days = Array.from(backendDates)

    setCurrentHabit(habit)
    updateHabit(habit)
  };

  const handleEditIconClick = (id) => {
    setEditHabitModal(true)
    handleShowHabitModalHabitModal()
    setCurrentHabit(habit)
  }

  return (
    <Row>
      <Col>
        <Card style={{ width: '160px', height: '160px' }}>
          <Card.Body>
            <Card.Title>{habit.action}</Card.Title>
            <Card.Text>{habit.time} min</Card.Text>
            <Card.Text>{habit.location}</Card.Text>
          </Card.Body>
          <img onClick={handleEditIconClick} src="https://chains.cc/assets/icons/gear-c9707fddb4983b397b5a47865115d6cc.svg" className="settingIcon"></img>
        </Card> <br />
        <ul className="dots">
          {days.map(day => 
            <li
              className="dot-field"
              key={day}
            >
              <div
                className={`dot${backendDates.has(day) ? ' selected' : ''}`}
                onClick={() => handleDotClick(day)}
              >
              </div>
            </li>
          )}
        </ul>
      </Col>
    </Row>
  );
}

export default HabitCard;
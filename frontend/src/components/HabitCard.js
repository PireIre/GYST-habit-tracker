import React, { useState } from "react"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HabitCard.css'



function HabitCard({ habit, setCurrentHabit, setEditHabitModal, handleShowHabitModalHabitModal}) {
  const [selectedDates, setSelectedDates] = useState(new Set());


  const handleDotClick = (date) => {
    const newSelectedDates = new Set(selectedDates);
    if (newSelectedDates.has(date)) {
      newSelectedDates.delete(date);
    } else {
      newSelectedDates.add(date);
    }
    setSelectedDates(newSelectedDates);

  };

  const handleEditIconClick = (id) => {
    setEditHabitModal(true)
    handleShowHabitModalHabitModal()
    setCurrentHabit(habit)
  }

  const renderDots = () => {
    const dots = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toDateString();
      const isSelected = selectedDates.has(dateString);
      dots.push(
        <li 
        className="dot-field"
        key={i}
        > 
        <div
          className={`dot${isSelected ? ' selected' : ''}`}
          onClick={() => handleDotClick(dateString)}
        >
        </div>
        </li>
      );
    }
    return dots;
  };


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
          {renderDots()}
        </ul>
      </Col>
    </Row>
  );
}

export default HabitCard;
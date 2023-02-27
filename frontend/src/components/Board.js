import React, { useEffect, useState } from "react"
import HabitCard from "./HabitCard"
import HabitModal from "./HabitModal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GystNavbar from './GystNavbar'
import Past30Days from './Past30Days'


const Board = () => {
  const [backendHabits, setBackendHabits] = useState("")
  const [currentHabit, setCurrentHabit] = useState({})
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [editHabitModal, setEditHabitModal] = useState(false);
  const [days, setDays] = useState([]);

  const habitsEndpoint = "/api/habit";

  const handleCloseHabitModal = () => setShowHabitModal(false);

  const handleShowHabitModalHabitModal = () => {
    setShowHabitModal(true)
  };
  
  console.log(currentHabit)

  const updateHabit = (habit) => {

    let updatedHabit = {
      action: habit.action,
      time: habit.time,
      location: habit.location,
      days: habit.days,
    }

    fetch(habitsEndpoint + "/" + habit._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('x-auth-token')
      },
      body: JSON.stringify(updatedHabit),
    })
      .then(res => res.json())
      .then(habit => setCurrentHabit(habit))
  }

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

  useEffect(() =>  fetchHabits, [currentHabit])

  return (
    <>
      <GystNavbar />
      <Container fluid>
        <Row>
          <Col lg="auto" xs={1}>
            <Past30Days 
            days={days}
            setDays={setDays}
            />
          </Col>

          {backendHabits && backendHabits.map((habit, i) =>
            <Col key={i} lg="auto">
              <HabitCard 
                updateHabit={updateHabit}
                habit={habit} 
                currentHabit={currentHabit}
                setCurrentHabit={setCurrentHabit} 
                setShowHabitModal={setShowHabitModal} 
                setEditHabitModal={setEditHabitModal}
                handleShowHabitModalHabitModal={handleShowHabitModalHabitModal}
                days={days}
              />
            </Col>
          )}
          
          <Col>
            <HabitModal
              updateHabit={updateHabit}
              currentHabit={currentHabit}
              handleCloseHabitModal={handleCloseHabitModal}
              handleShowHabitModalHabitModal={handleShowHabitModalHabitModal}
              setCurrentHabit={setCurrentHabit}
              showHabitModal={showHabitModal}
              editHabitModal={editHabitModal}
              setEditHabitModal={setEditHabitModal}
              />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Board;
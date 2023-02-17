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


  const handleCloseHabitModal = () => setShowHabitModal(false);

  const handleShowHabitModalHabitModal = () => {
    setShowHabitModal(true)
  };


  const habitsEndpoint = "/api/habit";

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

  useEffect(() => fetchHabits, [currentHabit])

  return (
    <>
      <GystNavbar />
      <Container fluid>
        <Row>
          <Col lg="auto" xs={1}>
            <Past30Days />
          </Col>

          {backendHabits && backendHabits.map((habit, i) =>
            <Col key={i} lg="auto">
              <HabitCard 
                habit={habit} 
                setCurrentHabit={setCurrentHabit} 
                setShowHabitModal={setShowHabitModal} 
                setEditHabitModal={setEditHabitModal}
                handleShowHabitModalHabitModal={handleShowHabitModalHabitModal}
              />
            </Col>
          )}
          
          <Col>
            <HabitModal
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
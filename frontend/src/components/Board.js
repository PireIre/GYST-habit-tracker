import React, { useEffect, useState } from "react"
import HabitCard from "./HabitCard"
import HabitModal from "./HabitModal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GystNavbar from './GystNavbar'


const Board = () => {
  const [backendHabits, setBackendHabits] = useState("")
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

  useEffect(() => fetchHabits, [backendHabits])

  return (
    <>
      <GystNavbar />
      <Container fluid>
        <Row>
          <Col ></Col>

          {backendHabits && backendHabits.map((habit, i) =>
            <Col key={i} lg="auto">
              <HabitCard habit={habit} />
            </Col>
          )}

          <Col ><HabitModal /></Col>
        </Row>
      </Container>
    </>
  );
}

export default Board;
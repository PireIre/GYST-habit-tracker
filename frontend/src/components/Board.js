import React from "react"
import HabitCard from "./HabitCard"
import HabitModal from "./HabitModal";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GystNavbar from './GystNavbar'


const Board = () => {
  return (
    <>
      <GystNavbar />
      <Container fluid>
        <Row>
          <Col lg="auto"><HabitCard /></Col>
          <Col ><HabitModal /></Col>
        </Row>
      </Container>
    </>
  );
}

export default Board;
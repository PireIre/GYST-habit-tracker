import React, { useState, useEffect } from "react";
import "./Past30Days.css";
import logo from "../static/Logo.png"

const Past30Days = ( {days, setDays} ) => {

  useEffect(() => {
    const today = new Date();
    const pastDays = [];
    for (let i = 0; i < 30; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      pastDays.push(
        `${day.toLocaleString("default", { month: "long" })} ${day.getDate()}, ${day.toLocaleString("default", { weekday: "long" })}`
      );
    }
    setDays(pastDays);
  }, []);

  return (
    <>
    <img width="160px" src={logo}></img> <br/><br/>
    <ul className="past-30-days">
      {days.map((day, index) => (
        <li key={index} className="past-30-days__item">{day}</li>
      ))}
    </ul>
    </>
  );
};

export default Past30Days;

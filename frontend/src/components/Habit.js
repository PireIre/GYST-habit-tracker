import React, { useEffect, useState } from "react"

function Habit() {
  const habitsEndpoint = "/api/habit";
  const [backendHabits, setBackendHabits] = useState("")
  const [action, setAction] = useState("")

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
        }})
      .then(res => res.json())

    } catch (error) {
      console.log("Could not delete the habit!" + error);
    }

    fetchHabits();
  }
  
  const addHabit = (e) => {
    e.preventDefault();

    var time = prompt("How many minutes will you " + e.target[0].value + " for?");
    var location = prompt("Where will you " + e.target[0].value + "?")
    
    const newHabit = {
       "action": e.target[0].value, 
       "time": time,
       "location": location,
      }

    fetch(habitsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHabit),
    })
    .then(res => res.json())
    
    setAction("");
    fetchHabits()
  }

  useEffect(() =>  fetchHabits , [])
  
  return (
    <div>
      <form onSubmit={addHabit}>
        <label>
          Add habit:
    <input type="text" name="habit" value={action}  onChange={event => setAction(event.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>List of habits</h1>
      {backendHabits && backendHabits.map((habit, i) =>
        <li key={i}>{"I will " + habit.action + " for " + habit.time + " minutes, in " + habit.location} <div onClick={() => handleDeleteHabit(habit._id)} style={{ color: "red", display: "inline", cursor: "pointer" }}>X</div></li>
      )}
    </div>
  );
}

export default Habit;
import React, { useEffect, useState } from "react";
import Habit from "./components/Habit";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage"
import NotFound from "./components/NotFound"


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Habit />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
      </Routes>
    </main>
  );
}

export default App;
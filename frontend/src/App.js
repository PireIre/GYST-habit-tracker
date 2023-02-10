import React from "react";
import Board from "./components/Board";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import NotFound from "./components/NotFound"
import PrivateRoutes from "./components/PrivateRoutes"



function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/not-found" element={<NotFound />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Board />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
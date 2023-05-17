import React from "react";
import Board from "./components/Board";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import NotFound from "./components/NotFound"
import PrivateRoutes from "./components/PrivateRoutes"
import PublicRoutes from "./components/PublicRoutes"
import GystNavbar from './components/GystNavbar'
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <main>
      <AuthProvider>
        <GystNavbar />

        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />}></Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Board />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>

    </main>
  );
}

export default App;
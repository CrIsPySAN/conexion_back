import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Usuario/LandingPage'
import EncuestasU from './pages/Usuario/EncuestasU'
import Login from './pages/Usuario/Login'
import Register from './pages/Usuario/Register'
import Validate from './pages/Usuario/Validate'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/encuestas" element={<EncuestasU />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

"use client"

import type React from "react"
import { useState } from "react"
import register_img from "../../assets/images/registro2.jpg"
import logo from "../../assets/images/KANKUN_Horizontal.png"
import "../../assets/styles/Register.css"
import { Link } from "react-router-dom"

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration attempted with:", { fullName, email, password, confirmPassword })
  }

  return (
    <div className="register-auth-container">
      <div className="register-brand-header">
        <img className="register-brand-logo" src={logo || "/placeholder.svg"} alt="Logo" />
      </div>
      <div className="register-auth-media">
        <img className="register-auth-image" src={register_img || "/placeholder.svg"} alt="Register" />
      </div>
      <div className="register-auth-content">
        <div className="register-form-wrapper">
          <h1 className="register-auth-title">Crear Cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Nombre Completo</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Nombre y Apellido"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="register-submit-btn">
              Registrarse
            </button>
            <div className="register-links">
              <Link to="/" className="register-home-link">
                Volver Al Inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register


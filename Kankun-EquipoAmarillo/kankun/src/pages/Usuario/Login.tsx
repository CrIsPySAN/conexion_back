"use client"

import type React from "react"
import { useState } from "react"
import login_img from "../../assets/images/login.jpg"
import logo from "../../assets/images/KANKUN_Horizontal.png"
import "../../assets/styles/Login.css"
import { Link } from "react-router-dom"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", email, password)
  }

  return (
    <div className="login-auth-container">
      <div className="login-brand-header">
        <img className="login-brand-logo" src={logo || "/placeholder.svg"} alt="Logo" />
      </div>
      <div className="login-auth-media">
        <img className="login-auth-image" src={login_img || "/placeholder.svg"} alt="Login" />
      </div>
      <div className="login-auth-content">
        <div className="login-form-wrapper">
          <h1 className="login-auth-title">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ejemplo@mail.com"
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
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <button type="submit" className="login-submit-btn">
              Iniciar Sesión
            </button>
            <div className="login-links">
              <Link to="/" className="login-home-link">
                Volver Al Inicio
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
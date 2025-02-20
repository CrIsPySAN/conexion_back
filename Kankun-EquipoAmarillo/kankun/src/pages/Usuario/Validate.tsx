"use client"

import type React from "react"
import { useState } from "react"
import validat_img from "../../assets/images/verificacion.jpg"
import logo from "../../assets/images/KANKUN_Horizontal.png"
import "../../assets/styles/Validate.css"

export default function Validate() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""])
  const email = "ejemplo@gmail.com"

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      if (value !== "" && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join("")
    console.log("Verification attempted with code:", code)
  }

  return (
    <div className="validate-page">
      <div className="verify-container">
        <div className="verify-card">
          <div className="verify-image-section">
            <img src={validat_img || "/placeholder.svg"} alt="Sunset with palm tree" className="verify-image" />
          </div>

          <div className="verify-form-section">
            <div className="logo-container">
              <img src={logo || "/placeholder.svg"} alt="KANKUN Logo" className="logo" />
            </div>

            <h1 className="verify-title">Verifica tu identidad</h1>

            <p className="verify-text">
              Se acaba de enviar un código hacia tu correo
              <br />
              {email}
            </p>

            <form onSubmit={handleSubmit} className="verify-form">
              <div className="code-inputs">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="code-input"
                  />
                ))}
              </div>

              <button type="submit" className="verify-button">
                Verificar
              </button>

              <button type="button" className="resend-button">
                Reenviar Código
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client";
import React, { useState } from "react";
import Navbar from "../Usuario/Componentes/Navbar";
import "../../assets/styles/EncuestasU.css";

const EncuestasU = () => {
  const [formData, setFormData] = useState({
    hotel: "",
    rating: "",
    mejorAspecto: "",
    mejorar: "",
    recomendaria: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Encuesta enviada:", formData);
    alert("¡Gracias por tu opinión!");
  };

  return (
    <>
      <Navbar />
      <div className="encuestasU-container">
        <h1 className="encuestasU-title">Encuesta sobre tu Experiencia en Hoteles</h1>
        <p className="encuestasU-description">
          Ayúdanos a mejorar las recomendaciones respondiendo esta breve encuesta sobre tu estadía.
        </p>

        <form className="encuestasU-form" onSubmit={handleSubmit}>
          {/* Nombre del Hotel */}
          <label className="encuestasU-label">Nombre del Hotel:</label>
          <input 
            type="text" 
            name="hotel" 
            value={formData.hotel} 
            onChange={handleChange} 
            className="encuestasU-input" 
            required 
          />

          {/* Calificación */}
          <label className="encuestasU-label">¿Cómo calificarías tu estadía?</label>
          <select name="rating" value={formData.rating} onChange={handleChange} className="encuestasU-select" required>
            <option value="">Selecciona una opción</option>
            <option value="5">⭐⭐⭐⭐⭐ - Excelente</option>
            <option value="4">⭐⭐⭐⭐ - Muy Buena</option>
            <option value="3">⭐⭐⭐ - Regular</option>
            <option value="2">⭐⭐ - Mala</option>
            <option value="1">⭐ - Terrible</option>
          </select>

          <label className="encuestasU-label">Fecha de Visita:</label>
          <select name="fechaVisita" value={formData.fechaVisita} onChange={handleChange} className="encuestasU-select" required>
            <option value="">Selecciona una fecha</option>
            <option value="Enero 2025"> Enero 2025</option>
            <option value="Diciembre 2024"> Diciembre 2024</option>
            <option value="Noviembre 2024"> Noviembre 2024</option>
            <option value="Octubre 2024"> Octubre 2024</option>
            <option value="Septiembre 2024"> Septiembre 2024</option>
            <option value="Agosto 2024"> Agosto 2024</option>
            <option value="Julio 2024"> Julio 2024</option>
            <option value="Junio 2024"> Junio 2024</option>
            <option value="Mayo 2024"> Mayo 2024</option>
            <option value="Abril 2024"> Abril 2024</option>
            <option value="Marzo 2024"> Marzo 2024</option>
            <option value="Febrero 2024"> Febrero 2024</option>
            <option value="Enero 2024"> Enero 2024</option>
          </select>

          {/* Aspecto a mejorar */}
          <label className="encuestasU-label">¿Qué crees que podría mejorar?</label>
          <textarea 
            name="mejorar" 
            value={formData.mejorar} 
            onChange={handleChange} 
            className="encuestasU-textarea" 
          />

          {/* ¿Recomendarías el hotel? */}
          <label className="encuestasU-label">¿Recomendarías este hotel?</label>
          <div className="encuestasU-radio-group">
            <label>
              <input type="radio" name="recomendaria" value="Sí" onChange={handleChange} required /> Sí
            </label>
            <label>
              <input type="radio" name="recomendaria" value="No" onChange={handleChange} required /> No
            </label>
          </div>

          {/* Botón de Enviar */}
          <button type="submit" className="encuestasU-button">Enviar Encuesta</button>
        </form>
      </div>
    </>
  );
};

export default EncuestasU;

"use client";
import React from "react";
import "./Podium.css";
import "../../../assets/styles/Global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export interface CarouselItem {
  id: string;
  title: string;
  image: string;
  description: string;
  details: string;
  rating?: number;
  location?: string;
}

interface PodiumProps {
  items: CarouselItem[];
  onItemClick: (item: CarouselItem) => void;
  categoryTitle: string;
  categoryDescription: string;
}

const Podium: React.FC<PodiumProps> = ({ items, onItemClick, categoryTitle, categoryDescription }) => {
  return (
    <div className="podium-container">
      <div className="podium-header">
        <h2>{categoryTitle}</h2>
        <p className="category-description">{categoryDescription}</p>
      </div>
      <div className="podium-grid">
        {items.map((item, index) => {
          let rankClass = "";
          if (index === 0) rankClass = "rank-1";
          else if (index === 1) rankClass = "rank-2";
          else if (index === 2) rankClass = "rank-3";
          else if (index === 3) rankClass = "rank-4";
          else if (index === 4) rankClass = "rank-5";

          return (
            <div
              key={item.id}
              className={`podium-card ${rankClass}`}
              onClick={() => onItemClick(item)}
            >
              <div
                className="podium-image"
                style={{ backgroundImage: `url(${item.image || "/placeholder.svg"})` }}
              >
                <div className="podium-rank">{index + 1}</div>
              </div>
              <div className="podium-details">
                <h3 className="podium-title">{item.title}</h3>
                <p className="podium-info">
                  <FontAwesomeIcon icon={faInfoCircle} className="info-icon" /> {item.description}
                </p>
                {item.rating && (
                  <p className="podium-rating">
                    <FontAwesomeIcon icon={faStar} className="star-icon" /> {item.rating.toFixed(1)}
                  </p>
                )}
                {item.location && (
                  <p className="podium-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" /> {item.location}
                  </p>
                )}
                <button className="podium-details-button">Ver Detalles</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Podium;

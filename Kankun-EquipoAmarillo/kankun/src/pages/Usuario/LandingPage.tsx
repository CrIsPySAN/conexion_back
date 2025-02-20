"use client";

import { useState, useEffect } from "react";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import Podium, { type CarouselItem } from "./Componentes/Podium";
import Modal from "./Componentes/Modal";
import { testConnection } from "../../services/api/test";
import "../../assets/styles/LandingPage.css";
import "../../assets/styles/global.css";

// Importaciones de imágenes
import info1 from "../../assets/images/woman-walking-railay-beach-krabi-thailand.jpg"
import info2 from "../../assets/images/stylish-young-women-traveling-together-europe-dressed-spring-trendy-dresses-accessories.jpg"
import info3 from "../../assets/images/trip-planning-map-others-stuff.jpg"
import Cancun from "../../assets/images/Cancun.jpg"
import RitzIMG from "../../assets/images/Ritz.jpg";
import JwMarriotIMG from "../../assets/images/Marriot.webp";
import HyattIMG from "../../assets/images/hyatt.jpg";
import GrantIMG from "../../assets/images/grant.jpg";
import LeblancIMG from "../../assets/images/leblanc.webp";
import MusaIMG from "../../assets/images/musa.jpg";
import XcaretIMG from "../../assets/images/xcaret.jpg";
import XelhaIMG from "../../assets/images/xelha.jpg";
import DosojosIMG from "../../assets/images/dosojos.jpg";
import ElreyIMG from "../../assets/images/elrey.jpg";
import DelfinesIMG from "../../assets/images/delfines.avif";
import NorteIMG from "../../assets/images/norte.jpg";
import MaromaIMG from "../../assets/images/maroma.jpg";
import ChacmoolIMG from "../../assets/images/chacmool.jpg";
import ForumIMG from "../../assets/images/forum.jpg";
import LorenzillosIMG from "../../assets/images/lorenzillos.jpg";
import HarrysIMG from "../../assets/images/harry.jpg";
import HabichuelaIMG from "../../assets/images/habichuele.jpg";
import PuertomaderoIMG from "../../assets/images/puertomadero.jpg";
import DestileriaIMG from "../../assets/images/destileria.jpg";

const hotels: CarouselItem[] = [
  {
    id: "hotel1",
    title: "The Ritz-Carlton, Cancun",
    image: RitzIMG,
    description: "Lujo y confort en el corazón de Cancún.",
    details:
      "Tel: +52 998 123 4567, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",
  
  },
  {
    id: "hotel2",
    title: "JW Marriott Cancun Resort & Spa",
    image: JwMarriotIMG,
    description: "Elegancia y servicio de alta calidad.",
    details:
      "Tel: +52 998 234 5678, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",

  },
  {
    id: "hotel3",
    title: "Hyatt Zilara Cancun",
    image: HyattIMG,
    description: "Experiencia todo incluido de lujo.",
    details:
      "Tel: +52 998 345 6789, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",
  },
  {
    id: "hotel4",
    title: "Grand Fiesta Americana Coral Beach",
    image: GrantIMG,
    description: "Estilo y sofisticación frente al mar.",
    details:
      "Tel: +52 998 456 7890, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",
  },
  {
    id: "hotel5",
    title: "Le Blanc Spa Resort Cancun",
    image: LeblancIMG,
    description: "Exclusividad y relax en Cancún.",
    details:
      "Tel: +52 998 567 8901, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",
  },
];

const attractions: CarouselItem[] = [
  {
    id: "attr1",
    title: "Museo Subacuático de Arte",
    image: MusaIMG,
    description: "Fusión de arte y naturaleza en un museo único.",
    details:
      "Tel: +52 998 678 9012, Horarios: 9-18, Ubicación: Isla Mujeres, Cancún.",
  },
  {
    id: "attr2",
    title: "Xcaret",
    image: XcaretIMG,
    description: "Parque eco-arqueológico lleno de cultura y aventura.",
    details:
      "Tel: +52 998 789 0123, Horarios: 8-20, Ubicación: Riviera Maya, Cancún.",
  },
  {
    id: "attr3",
    title: "Xel-Há",
    image: XelhaIMG,
    description: "Paraíso natural ideal para explorar y relajarse.",
    details:
      "Tel: +52 998 890 1234, Horarios: 8-19, Ubicación: Riviera Maya, Cancún.",
  },
  {
    id: "attr4",
    title: "Cenote Dos Ojos",
    image: DosojosIMG,
    description: "Descubre la magia de este cenote de aguas cristalinas.",
    details:
      "Tel: +52 998 901 2345, Horarios: 8-18, Ubicación: Cerca de Cancún.",
  },
  {
    id: "attr5",
    title: "El Rey Ruins",
    image: ElreyIMG,
    description: "Ruinas mayas con historia y belleza ancestral.",
    details:
      "Tel: +52 998 012 3456, Horarios: 8-17, Ubicación: Zona Hotelera, Cancún.",
  },
];

const beaches: CarouselItem[] = [
  {
    id: "beach1",
    title: "Playa Delfines",
    image: DelfinesIMG,
    description: "Espaciosa playa con una vista espectacular del mar.",
    details: "Tel: +52 998 111 2222, Horarios: 24/7, Ubicación: Cancún.",
  },
  {
    id: "beach2",
    title: "Playa Norte",
    image: NorteIMG,
    description: "Arena blanca y aguas turquesa en su máxima expresión.",
    details: "Tel: +52 998 222 3333, Horarios: 24/7, Ubicación: Isla Mujeres.",
  },
  {
    id: "beach3",
    title: "Playa Maroma",
    image: MaromaIMG,
    description: "Uno de los paraísos tropicales más reconocidos.",
    details: "Tel: +52 998 333 4444, Horarios: 24/7, Ubicación: Riviera Maya.",
  },
  {
    id: "beach4",
    title: "Playa Chac Mool",
    image: ChacmoolIMG,
    description: "Ambiente tranquilo ideal para descansar y disfrutar.",
    details: "Tel: +52 998 444 5555, Horarios: 24/7, Ubicación: Cancún.",
  },
  {
    id: "beach5",
    title: "Playa Forum",
    image: ForumIMG,
    description: "Vibrante y llena de vida, perfecta para socializar.",
    details:
      "Tel: +52 998 555 6666, Horarios: 24/7, Ubicación: Zona Hotelera, Cancún.",
  },
];

const restaurants: CarouselItem[] = [
  {
    id: "rest1",
    title: "Lorenzillo's",
    image: LorenzillosIMG,
    description: "Deliciosos mariscos en un ambiente inigualable.",
    details:
      "Tel: +52 998 666 7777, Horarios: 12-22, Ubicación: Zona Hotelera, Cancún.",
  },
  {
    id: "rest2",
    title: "Harry's Prime Steakhouse",
    image: HarrysIMG,
    description: "Cortes premium en un entorno elegante y moderno.",
    details:
      "Tel: +52 998 777 8888, Horarios: 12-23, Ubicación: Zona Hotelera, Cancún.",
  },
  {
    id: "rest3",
    title: "La Habichuela",
    image: HabichuelaIMG,
    description: "La auténtica cocina mexicana en un ambiente encantador.",
    details:
      "Tel: +52 998 888 9999, Horarios: 12-22, Ubicación: Centro de Cancún.",
  },
  {
    id: "rest4",
    title: "Puerto Madero",
    image: PuertomaderoIMG,
    description: "Alta cocina argentina con vistas al mar.",
    details:
      "Tel: +52 998 999 0000, Horarios: 12-23, Ubicación: Zona Hotelera, Cancún.",
  },
  {
    id: "rest5",
    title: "La Destilería",
    image: DestileriaIMG,
    description: "Ambiente festivo con lo mejor de tequila y mezcal.",
    details:
      "Tel: +52 998 000 1111, Horarios: 12-23, Ubicación: Zona Hotelera, Cancún.",
  },
];

const categoryDescriptions = {
  hotels:
    "Descubre los mejores hoteles de Cancún, donde el lujo y la comodidad se combinan con el paraíso tropical.",
  attractions:
    "Explora las atracciones más emocionantes y culturales de Cancún, ideales para aventureros y curiosos.",
  beaches:
    "Disfruta de las playas más hermosas, con arenas blancas y aguas cristalinas, perfectas para relajarte.",
  restaurants:
    "Saborea la mejor gastronomía, desde cocina local hasta platos internacionales en ambientes únicos.",
};

const LandingPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", content: "" });
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [connectionError, setConnectionError] = useState<boolean>(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await testConnection();
        setConnectionStatus(result.message);
        setConnectionError(false);
        console.log('Conexión exitosa:', result);
      } catch (error) {
        setConnectionStatus('Error de conexión con el backend');
        setConnectionError(true);
        console.error('Error de conexión:', error);
      }
    };

    checkConnection();
  }, []);

  const handleItemClick = (item: CarouselItem) => {
    setModalData({ title: item.title, content: item.details });
    setModalOpen(true);
  };

  return (
    <div className="landing-page">
      <Navbar />

      {connectionStatus && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px',
            backgroundColor: connectionError ? '#f44336' : '#4CAF50',
            color: 'white',
            borderRadius: '4px',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
          }}
          onClick={() => setConnectionStatus('')}
          title="Clic para cerrar"
        >
          {connectionStatus}
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>KANKUN 4.0: Experiencias Turísticas Personalizadas</h1>
          <p>
            Descubre itinerarios diseñados especialmente para ti en el paraíso
            caribeño.
          </p>
          <button className="hero-button">Comienza Tu Aventura</button>
        </div>
        <div className="hero-image">
          <div className="image-placeholder"></div>
        </div>
      </section>

      <section className="cta">
        <h2>¿Listo para Vivir la Experiencia KANKUN 4.0?</h2>
        <p>
          Personaliza tu viaje, descubre ofertas exclusivas y crea recuerdos que
          durarán toda la vida.
        </p>
        <button className="cta-button">Planea Tu Viaje Ahora</button>
        <img className="cancunimg" src={Cancun || "/placeholder.svg"} alt="" />
      </section>

      <section className="features">
        <h2>Tu Viaje Perfecto en 3 Pasos</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>1. Cuéntanos tus Gustos</h3>
            <p>
              Dinos qué te apasiona: aventura, relax, gastronomía o cultura.
            </p>
            <img src={info2 || "/placeholder.svg"} alt="" />
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>2. Diseñamos tu Itinerario</h3>
            <p>
              Creamos un plan personalizado con las mejores actividades para ti.
            </p>
            <img src={info3 || "/placeholder.svg"} alt="" />
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>3. Disfruta tu Viaje</h3>
            <p>
              Vive experiencias inolvidables con la tranquilidad de tener todo
              organizado.
            </p>
            <img src={info1 || "/placeholder.svg"} alt="" />
          </div>
        </div>
      </section>

      <section className="project-description">
        <h2>¿Por qué elegir KANKUN?</h2>
        <div className="benefits-container">
          <div className="benefit-item">
            <h3>🎯 Viajes Personalizados</h3>
            <p>
              Cada viaje es único. Adaptamos itinerarios según tus gustos y preferencias.
            </p>
          </div>
          <div className="benefit-item">
            <h3>💰 Mejores Precios</h3>
            <p>
              Accede a ofertas y promociones exclusivas para que tu viaje sea inolvidable.
            </p>
          </div>
          <div className="benefit-item">
            <h3>🌴 Experiencias Locales</h3>
            <p>
              Vive Cancún como un local con recomendaciones auténticas y secretos bien guardados.
            </p>
          </div>
        </div>
      </section>

      <section className="podium-row">
        <Podium
          items={hotels}
          onItemClick={handleItemClick}
          categoryTitle="Top Hoteles de Cancún"
          categoryDescription={categoryDescriptions.hotels}
        />
        <Podium
          items={attractions}
          onItemClick={handleItemClick}
          categoryTitle="Top Atracciones de Cancún"
          categoryDescription={categoryDescriptions.attractions}
        />
      </section>

      <section className="podium-row">
        <Podium
          items={beaches}
          onItemClick={handleItemClick}
          categoryTitle="Top Playas de Cancún"
          categoryDescription={categoryDescriptions.beaches}
        />
        <Podium
          items={restaurants}
          onItemClick={handleItemClick}
          categoryTitle="Top Restaurantes de Cancún"
          categoryDescription={categoryDescriptions.restaurants}
        />
      </section>

      <Footer />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalData.title}
        content={modalData.content}
        image={""}
      />
    </div>
  );
};

export default LandingPage;
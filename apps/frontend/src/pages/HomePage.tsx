import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="section hero-section">
        <div className="container">
          <h1>Encuentra tu trabajo ideal</h1>
          <p>
            Conectamos talento con oportunidades. Descubre empresas que realmente 
            se adapten a tu perfil y objetivos profesionales.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/onboarding')}
            >
              🎯 Obtener Recomendaciones
            </button>
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/companies')}
            >
              🏢 Explorar Empresas
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>¿Qué quieres hacer hoy?</h2>
          </div>
          <div className="grid grid-3">
            <div 
              className="card clickable-card"
              onClick={() => navigate('/onboarding')}
            >
              <div className="card-icon">🎯</div>
              <h3>Crear mi Perfil</h3>
              <p>Responde unas preguntas y obtén recomendaciones personalizadas de empresas</p>
              <span className="card-link">Empezar →</span>
            </div>

            <div 
              className="card clickable-card"
              onClick={() => navigate('/companies')}
            >
              <div className="card-icon">🏢</div>
              <h3>Explorar Empresas</h3>
              <p>Navega por nuestro directorio completo de empresas con filtros avanzados</p>
              <span className="card-link">Ver todas →</span>
            </div>

            <div 
              className="card clickable-card"
              onClick={() => navigate('/recommendations')}
            >
              <div className="card-icon">⭐</div>
              <h3>Ver Recomendaciones</h3>
              <p>Si ya tienes un perfil, ve directamente a tus empresas recomendadas</p>
              <span className="card-link">Ver mis matches →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-title">
            <h2>¿Por qué usar EncuentraPega?</h2>
          </div>
          <div className="grid grid-2">
            <div className="feature-item">
              <div className="feature-number">01</div>
              <h3>Recomendaciones Inteligentes</h3>
              <p>Nuestro algoritmo analiza tu perfil para encontrar las empresas que mejor se adaptan a ti.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">02</div>
              <h3>Búsqueda Avanzada</h3>
              <p>Filtra por industria, tamaño, beneficios, ubicación y más para encontrar lo que buscas.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">03</div>
              <h3>Información Completa</h3>
              <p>Accede a datos detallados sobre cultura, beneficios y posiciones abiertas.</p>
            </div>
            <div className="feature-item">
              <div className="feature-number">04</div>
              <h3>Rápido y Fácil</h3>
              <p>Interfaz intuitiva diseñada para que encuentres oportunidades sin complicaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-title">
            <h2>Nuestros Números</h2>
            <p>Únete a miles de profesionales que ya encontraron su trabajo ideal</p>
          </div>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">100+</div>
              <div className="stat-label">Empresas</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">17</div>
              <div className="stat-label">Industrias</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">500+</div>
              <div className="stat-label">Posiciones</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">95%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
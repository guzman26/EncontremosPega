import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Tu próxima oportunidad laboral te espera
            </h1>
            <p className="hero-subtitle">
              Descubre empresas que realmente se adaptan a tu perfil y objetivos profesionales. 
              Conectamos talento con oportunidades de forma inteligente y personalizada.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/onboarding')}
              >
                Comenzar →
              </button>
              <button 
                className="btn btn-outline btn-lg"
                onClick={() => navigate('/companies')}
              >
                Explorar Empresas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>¿Por qué EncuentraPega?</h2>
            <p>Todo lo que necesitas para encontrar tu próximo trabajo</p>
          </div>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Recomendaciones Inteligentes</h3>
              <p>Nuestro algoritmo analiza tu perfil para encontrar las empresas que mejor se adaptan a ti.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Búsqueda Avanzada</h3>
              <p>Filtra por industria, tamaño, beneficios y ubicación para encontrar exactamente lo que buscas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Información Completa</h3>
              <p>Accede a detalles sobre cultura, beneficios y posiciones abiertas en cada empresa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-dark">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">100+</div>
              <div className="stat-label">Empresas</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">17</div>
              <div className="stat-label">Industrias</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">500+</div>
              <div className="stat-label">Posiciones</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">95%</div>
              <div className="stat-label">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div className="cta-box">
            <h2>¿Listo para encontrar tu siguiente oportunidad?</h2>
            <p>Completa un rápido perfil y recibe recomendaciones personalizadas</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/onboarding')}
            >
              Crear Perfil Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
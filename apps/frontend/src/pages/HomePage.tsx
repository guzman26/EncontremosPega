import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>¡Encuentra tu trabajo ideal!</h1>
        <p>Conectamos talento con oportunidades. Descubre empresas que realmente se adapten a tu perfil y objetivos profesionales.</p>
        <div className="hero-actions">
          <button 
            className="cta-button primary"
            onClick={() => navigate('/onboarding')}
          >
            🎯 Obtener Recomendaciones
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => navigate('/companies')}
          >
            🏢 Explorar Empresas
          </button>
        </div>
      </div>
      
      <div className="quick-access-section">
        <h2>¿Qué quieres hacer hoy?</h2>
        <div className="quick-access-grid">
          <div 
            className="quick-access-card"
            onClick={() => navigate('/onboarding')}
          >
            <div className="card-icon">🎯</div>
            <h3>Crear mi Perfil</h3>
            <p>Responde unas preguntas y obtén recomendaciones personalizadas de empresas</p>
            <span className="card-cta">Empezar →</span>
          </div>

          <div 
            className="quick-access-card"
            onClick={() => navigate('/companies')}
          >
            <div className="card-icon">🏢</div>
            <h3>Explorar Empresas</h3>
            <p>Navega por nuestro directorio completo de empresas con filtros avanzados</p>
            <span className="card-cta">Ver todas →</span>
          </div>

          <div 
            className="quick-access-card"
            onClick={() => navigate('/recommendations')}
          >
            <div className="card-icon">⭐</div>
            <h3>Ver Recomendaciones</h3>
            <p>Si ya tienes un perfil, ve directamente a tus empresas recomendadas</p>
            <span className="card-cta">Ver mis matches →</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>¿Por qué usar EncontemosPega?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Recomendaciones Inteligentes</h3>
            <p>Algoritmo que analiza tu perfil para encontrar las empresas que mejor se adapten a ti.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Búsqueda Avanzada</h3>
            <p>Filtra por industria, tamaño, beneficios, ubicación y más para encontrar lo que buscas.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Información Completa</h3>
            <p>Accede a datos detallados sobre cultura, beneficios y posiciones abiertas.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rápido y Fácil</h3>
            <p>Interfaz intuitiva diseñada para que encuentres oportunidades sin complicaciones.</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Nuestros Números</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Empresas</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">17</div>
            <div className="stat-label">Industrias</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Posiciones</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
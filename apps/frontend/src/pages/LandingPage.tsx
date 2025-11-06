import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScene from '../components/WelcomeScene';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* First Impression - Welcome Scene */}
      <WelcomeScene />

      {/* Hero Section */}
      <div className="landing-hero">
        <div className="hero-background-decoration"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge pulse-badge">🎉 Nueva plataforma de matching inteligente</span>
            </div>
            <h1 className="hero-title">
              Tu próxima <span className="gradient-text">oportunidad laboral</span> te espera
            </h1>
            <p className="hero-subtitle">
              Descubre empresas que realmente se adaptan a tu perfil y objetivos profesionales. 
              Conectamos talento con oportunidades de forma inteligente y personalizada.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-lg hero-btn-primary"
                onClick={() => navigate('/onboarding')}
              >
                Comenzar Ahora →
              </button>
              <button 
                className="btn btn-outline btn-lg hero-btn-secondary"
                onClick={() => navigate('/companies')}
              >
                Explorar Empresas
              </button>
            </div>
            <div className="hero-trust-indicators">
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>100% Gratuito</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Sin registro previo</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Resultados en minutos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="section section-how-it-works">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Cómo Funciona</span>
            <h2>Encuentra tu trabajo ideal en 3 simples pasos</h2>
            <p>Un proceso rápido y sencillo para conectar con las mejores oportunidades</p>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">📝</div>
              <h3>Completa tu perfil</h3>
              <p>Cuéntanos sobre tus habilidades, intereses y preferencias laborales en menos de 5 minutos.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3>Recibe recomendaciones</h3>
              <p>Nuestro algoritmo inteligente analiza tu perfil y te sugiere las empresas que mejor encajan contigo.</p>
            </div>
            <div className="step-connector"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">🚀</div>
              <h3>Conecta y aplica</h3>
              <p>Explora empresas, revisa posiciones abiertas y aplica directamente a las oportunidades que te interesan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-features">
        <div className="container">
          <div className="section-title">
            <span className="section-label">Características</span>
            <h2>¿Por qué EncuentraPega?</h2>
            <p>Todo lo que necesitas para encontrar tu próximo trabajo</p>
          </div>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🎯</div>
              </div>
              <h3>Recomendaciones Inteligentes</h3>
              <p>Nuestro algoritmo analiza tu perfil para encontrar las empresas que mejor se adaptan a ti, ahorrándote tiempo y esfuerzo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🔍</div>
              </div>
              <h3>Búsqueda Avanzada</h3>
              <p>Filtra por industria, tamaño, beneficios y ubicación para encontrar exactamente lo que buscas en tu carrera profesional.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">📊</div>
              </div>
              <h3>Información Completa</h3>
              <p>Accede a detalles sobre cultura, beneficios, salarios y posiciones abiertas en cada empresa antes de aplicar.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">💼</div>
              </div>
              <h3>Múltiples Industrias</h3>
              <p>Explora oportunidades en más de 17 industrias diferentes, desde tecnología hasta salud y educación.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">⚡</div>
              </div>
              <h3>Resultados Rápidos</h3>
              <p>Recibe recomendaciones personalizadas en minutos, no días. Tu tiempo es valioso.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">🔒</div>
              </div>
              <h3>Privacidad Garantizada</h3>
              <p>Tus datos están seguros. Mantenemos tu información privada y solo la usamos para mejorar tus recomendaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-stats bg-dark">
        <div className="container">
          <div className="section-title section-title-light">
            <h2>Números que hablan por sí solos</h2>
            <p>Únete a miles de profesionales que ya encontraron su oportunidad</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏢</div>
              <div className="stat-value">100+</div>
              <div className="stat-label">Empresas</div>
              <div className="stat-description">Empresas registradas</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏭</div>
              <div className="stat-value">17</div>
              <div className="stat-label">Industrias</div>
              <div className="stat-description">Sectores diferentes</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💼</div>
              <div className="stat-value">500+</div>
              <div className="stat-label">Posiciones</div>
              <div className="stat-description">Oportunidades activas</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">95%</div>
              <div className="stat-label">Satisfacción</div>
              <div className="stat-description">Usuarios satisfechos</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-box">
            <div className="cta-decoration"></div>
            <div className="cta-content">
              <h2>¿Listo para encontrar tu siguiente oportunidad?</h2>
              <p>Completa un rápido perfil y recibe recomendaciones personalizadas en minutos. Es gratis y no requiere registro previo.</p>
              <div className="cta-actions">
                <button 
                  className="btn btn-primary btn-lg cta-btn-primary"
                  onClick={() => navigate('/onboarding')}
                >
                  Crear Perfil Ahora
                </button>
                <button 
                  className="btn btn-outline btn-lg cta-btn-secondary"
                  onClick={() => navigate('/companies')}
                >
                  Ver Empresas
                </button>
              </div>
              <div className="cta-features">
                <span className="cta-feature">✓ Sin costo</span>
                <span className="cta-feature">✓ Sin registro</span>
                <span className="cta-feature">✓ Resultados inmediatos</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
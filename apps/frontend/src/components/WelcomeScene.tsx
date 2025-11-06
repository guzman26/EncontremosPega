import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScene.css';

const WelcomeScene: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Delay showing content for dramatic effect
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(contentTimer);
  }, []);

  const handleContinue = () => {
    setIsFadingOut(true);
    // Scroll to main content
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 300);
    // Remove component after fade out
    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  const handleStartNow = () => {
    navigate('/onboarding');
  };

  if (!isVisible) return null;

  return (
    <div className={`welcome-scene ${isFadingOut ? 'fading-out' : ''}`}>
      {/* Office Interior */}
      <div className="office-interior">
        {/* Office Floor */}
        <div className="office-floor"></div>
        
        {/* Office Walls */}
        <div className="office-wall office-wall-left"></div>
        <div className="office-wall office-wall-right"></div>
        
        {/* Office Desk */}
        <div className="office-desk">
          <div className="desk-monitor"></div>
          <div className="desk-keyboard"></div>
          <div className="desk-lamp"></div>
          <div className="desk-plant"></div>
        </div>

        {/* Office Window - The Key Element */}
        <div className="office-window">
          <div className="window-frame"></div>
          <div className="window-glass">
            {/* Mountain View Outside */}
            <div className="mountain-view">
              {/* Sky Gradient */}
              <div className="mountain-sky"></div>
              
              {/* Mountains Layers */}
              <div className="mountain-range mountain-range-1"></div>
              <div className="mountain-range mountain-range-2"></div>
              <div className="mountain-range mountain-range-3"></div>
              <div className="mountain-range mountain-range-4"></div>
              
              {/* Snow Caps */}
              <div className="snow-caps"></div>
              
              {/* Clouds */}
              <div className="cloud cloud-1"></div>
              <div className="cloud cloud-2"></div>
              <div className="cloud cloud-3"></div>
              
              {/* Sunlight Effect */}
              <div className="sunlight-beam"></div>
            </div>
          </div>
        </div>

        {/* Office Ceiling Lights */}
        <div className="ceiling-light ceiling-light-1"></div>
        <div className="ceiling-light ceiling-light-2"></div>
        <div className="ceiling-light ceiling-light-3"></div>
      </div>

      {/* Welcome Content Overlay */}
      <div className={`welcome-content ${showContent ? 'visible' : ''}`}>
        <div className="welcome-content-inner">
          <div className="welcome-badge">
            <span className="badge-icon">🏔️</span>
            <span>Bienvenido a Encontremos Pega</span>
          </div>
          <h1 className="welcome-title">
            Tu próxima <span className="highlight">oportunidad</span> te espera
          </h1>
          <p className="welcome-subtitle">
            Donde las grandes ciudades se encuentran con las grandes montañas. 
            Descubre oportunidades que van más allá de lo esperado.
          </p>
          <div className="welcome-actions">
            <button 
              className="btn btn-primary btn-lg welcome-btn-primary"
              onClick={handleStartNow}
            >
              Comenzar Ahora →
            </button>
            <button 
              className="btn btn-outline btn-lg welcome-btn-secondary"
              onClick={handleContinue}
            >
              Explorar
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`scroll-indicator ${showContent ? 'visible' : ''}`}>
        <div className="scroll-arrow"></div>
        <span>Desliza para continuar</span>
      </div>
    </div>
  );
};

export default WelcomeScene;


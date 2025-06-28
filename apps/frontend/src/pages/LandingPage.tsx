import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import cityBackground from '../assets/FondoStgo.jpeg';

const LandingPage: React.FC = () => {
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    setIsZooming(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate('/onboarding');
    }, 4500);
  };

  return (
    <div className={`landing-page ${isZooming ? 'zooming' : ''}`}>
      {/* Santiago Background */}
      <div className="city-background">
        <img src={cityBackground} alt="Santiago Background" className="city-background-image" />
        <div className="city-skyline"></div>
        <div className="clouds"></div>
      </div>
      
      {/* Office Interior */}
      <div className="office-interior">
        <div className="window-frame"></div>
        <div className="desk"></div>
        <div className="desk-items">
          <div className="coffee-cup"></div>
          <div className="notebook"></div>
          <div className="pen"></div>
        </div>
        
        {/* Laptop */}
        <div className="laptop-container">
          <div className="laptop">
            <div className="laptop-screen">
                              <div className="screen-content">
                  <div className="welcome-text">
                    <h1>EncuentraPega</h1>
                    <p>Tu siguiente oportunidad laboral te está esperando</p>
                  </div>
                </div>
            </div>
            <div className="laptop-keyboard"></div>
            <div className="laptop-trackpad"></div>
          </div>
        </div>
      </div>
      
      {/* UI Elements */}
      <div className="landing-ui">
        <div className="logo-section">
          <h1 className="main-title">EncuentraPega</h1>
          <p className="main-subtitle">Tu siguiente oportunidad laboral te está esperando</p>
        </div>
        
        <button 
          className="continue-button"
          onClick={handleContinue}
          disabled={isZooming}
        >
          {isZooming ? 'Cargando...' : 'Continuar'}
          <span className="button-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 
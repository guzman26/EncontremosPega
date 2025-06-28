import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to EncontemosPega</h1>
        <p>Your journey starts here. Discover amazing opportunities and connect with others.</p>
        <button className="cta-button">Get Started</button>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface designed for everyone.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Performance</h3>
            <p>Built with modern technologies for optimal speed.</p>
          </div>
          <div className="feature-card">
            <h3>Secure</h3>
            <p>Your data is safe and protected with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
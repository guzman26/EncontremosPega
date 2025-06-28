import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About EncontemosPega</h1>
        <p>Learn more about our mission and values</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At EncontemosPega, we are dedicated to creating meaningful connections
            and providing exceptional experiences for our users. We believe in
            innovation, quality, and putting our community first.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li><strong>Innovation:</strong> We constantly strive to improve and innovate</li>
            <li><strong>Quality:</strong> Excellence in everything we do</li>
            <li><strong>Community:</strong> Building strong relationships with our users</li>
            <li><strong>Integrity:</strong> Honest and transparent in all our dealings</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            We are a passionate team of developers, designers, and innovators
            working together to create amazing experiences. Our diverse backgrounds
            and expertise help us build solutions that truly make a difference.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 
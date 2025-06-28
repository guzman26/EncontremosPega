import React from 'react';
import { FormStepProps } from '../../types';

const PersonalInfoStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <>
      <div className="step-header">
        <h2 className="step-title">¡Hola! 👋</h2>
        <p className="step-subtitle">
          Solo necesitamos saber tu nivel de experiencia para encontrar las mejores oportunidades
        </p>
      </div>

      <div className="step-form">
        <div className="form-group">
          <label className="form-label">
            🎯 ¿Cuál es tu nivel de experiencia?
          </label>
          <div className="choice-grid compact">
            <div
              className={`choice-item compact ${data.level === 'student' ? 'selected' : ''}`}
              onClick={() => handleInputChange('level', 'student')}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>🎓</div>
              <h3>Estudiante</h3>
              <p>Aún estudiando o recién egresado</p>
            </div>
            
            <div
              className={`choice-item compact ${data.level === 'junior' ? 'selected' : ''}`}
              onClick={() => handleInputChange('level', 'junior')}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>🌱</div>
              <h3>Junior</h3>
              <p>0-2 años de experiencia</p>
            </div>
            
            <div
              className={`choice-item compact ${data.level === 'mid' ? 'selected' : ''}`}
              onClick={() => handleInputChange('level', 'mid')}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>💼</div>
              <h3>Semi-Senior</h3>
              <p>2-5 años de experiencia</p>
            </div>
            
            <div
              className={`choice-item compact ${data.level === 'senior' ? 'selected' : ''}`}
              onClick={() => handleInputChange('level', 'senior')}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>🚀</div>
              <h3>Senior</h3>
              <p>5+ años de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoStep; 
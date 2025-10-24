import React from 'react';
import { FormStepProps } from '../../types';

const PersonalInfoStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <>
      <div className="step-content">
        <div className="step-header">
          <h3>🎯 Tu Nivel de Experiencia</h3>
          <p>Selecciona la opción que mejor describe tu experiencia</p>
        </div>

        <div className="options-grid">
          <div
            className={`option-button ${data.level === 'student' ? 'selected' : ''}`}
            onClick={() => handleInputChange('level', 'student')}
          >
            <div className="option-icon">🎓</div>
            <div className="option-label">Estudiante</div>
            <div className="option-description">Recién egresado</div>
          </div>

          <div
            className={`option-button ${data.level === 'junior' ? 'selected' : ''}`}
            onClick={() => handleInputChange('level', 'junior')}
          >
            <div className="option-icon">🌱</div>
            <div className="option-label">Junior</div>
            <div className="option-description">0-2 años</div>
          </div>

          <div
            className={`option-button ${data.level === 'mid' ? 'selected' : ''}`}
            onClick={() => handleInputChange('level', 'mid')}
          >
            <div className="option-icon">💼</div>
            <div className="option-label">Semi-Senior</div>
            <div className="option-description">2-5 años</div>
          </div>

          <div
            className={`option-button ${data.level === 'senior' ? 'selected' : ''}`}
            onClick={() => handleInputChange('level', 'senior')}
          >
            <div className="option-icon">🚀</div>
            <div className="option-label">Senior</div>
            <div className="option-description">5+ años</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoStep; 
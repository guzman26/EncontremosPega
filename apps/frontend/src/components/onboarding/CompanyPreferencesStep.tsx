import React from 'react';
import { FormStepProps } from '../../types';

const CompanyPreferencesStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const companySizes = [
    { id: 'startup', name: 'Startup', description: '1-50 empleados', icon: '🚀' },
    { id: 'medium', name: 'Empresa Mediana', description: '51-500 empleados', icon: '🏢' },
    { id: 'large', name: 'Empresa Grande', description: '500+ empleados', icon: '🏛️' },
  ];

  const cultureValues = [
    { id: 'innovation', name: 'Innovación', description: 'Tecnología de vanguardia', icon: '💡' },
    { id: 'work-life-balance', name: 'Balance Vida-Trabajo', description: 'Horarios flexibles y bienestar', icon: '⚖️' },
    { id: 'growth', name: 'Crecimiento', description: 'Desarrollo profesional acelerado', icon: '📈' },
    { id: 'collaboration', name: 'Colaboración', description: 'Trabajo en equipo y comunicación', icon: '🤝' },
    { id: 'impact', name: 'Impacto Social', description: 'Proyectos que cambian el mundo', icon: '🌍' },
    { id: 'autonomy', name: 'Autonomía', description: 'Libertad para tomar decisiones', icon: '🎯' },
  ];

  const benefits = [
    { id: 'remote', name: 'Trabajo Remoto', description: 'Flexibilidad de ubicación', icon: '🏠' },
    { id: 'learning', name: 'Capacitación', description: 'Cursos y certificaciones', icon: '📚' },
    { id: 'health', name: 'Seguro de Salud', description: 'Cobertura médica completa', icon: '🏥' },
    { id: 'vacation', name: 'Vacaciones', description: 'Días libres generosos', icon: '🏖️' },
    { id: 'bonus', name: 'Bonos', description: 'Incentivos por performance', icon: '💰' },
    { id: 'equipment', name: 'Equipamiento', description: 'Laptop y herramientas de trabajo', icon: '💻' },
  ];

  const handleSizeSelection = (size: string) => {
    onUpdate({ size });
  };

  const handleCultureSelection = (culture: string) => {
    onUpdate({ culture });
  };

  const handleBenefitSelection = (benefit: string) => {
    onUpdate({ benefits: benefit });
  };

  return (
    <>
      <div className="step-content">
        {/* Company Size */}
        <div className="preference-section">
          <div className="step-header">
            <h3>🏢 ¿Qué tamaño de empresa prefieres?</h3>
          </div>
          <div className="preference-grid">
            {companySizes.map((size) => (
              <div
                key={size.id}
                className={`preference-card ${data.size === size.id ? 'selected' : ''}`}
                onClick={() => handleSizeSelection(size.id)}
              >
                <div className="preference-icon">{size.icon}</div>
                <div className="preference-content">
                  <h4>{size.name}</h4>
                  <p>{size.description}</p>
                </div>
                {data.size === size.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Culture Values */}
        <div className="preference-section">
          <div className="step-header">
            <h3>💫 ¿Qué valores son más importantes para ti?</h3>
          </div>
          <div className="preference-grid">
            {cultureValues.map((culture) => (
              <div
                key={culture.id}
                className={`preference-card ${data.culture === culture.id ? 'selected' : ''}`}
                onClick={() => handleCultureSelection(culture.id)}
              >
                <div className="preference-icon">{culture.icon}</div>
                <div className="preference-content">
                  <h4>{culture.name}</h4>
                  <p>{culture.description}</p>
                </div>
                {data.culture === culture.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="preference-section">
          <div className="step-header">
            <h3>🎁 ¿Qué beneficio priorizas más?</h3>
          </div>
          <div className="preference-grid">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`preference-card ${data.benefits === benefit.id ? 'selected' : ''}`}
                onClick={() => handleBenefitSelection(benefit.id)}
              >
                <div className="preference-icon">{benefit.icon}</div>
                <div className="preference-content">
                  <h4>{benefit.name}</h4>
                  <p>{benefit.description}</p>
                </div>
                {data.benefits === benefit.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPreferencesStep; 
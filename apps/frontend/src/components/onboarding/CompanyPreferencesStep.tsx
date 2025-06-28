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

      <div className="step-form">
        {/* Company Size */}
        <div className="form-group">
          <label className="form-label">
            🏢 ¿Qué tamaño de empresa prefieres?
          </label>
          <div className="choice-grid compact">
            {companySizes.map((size) => (
              <div
                key={size.id}
                className={`choice-item compact ${data.size === size.id ? 'selected' : ''}`}
                onClick={() => handleSizeSelection(size.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {size.icon}
                </div>
                <h3>{size.name}</h3>
                <p>{size.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Values */}
        <div className="form-group">
          <label className="form-label">
            💫 ¿Qué valores son más importantes para ti?
          </label>
          <div className="choice-grid compact">
            {cultureValues.map((culture) => (
              <div
                key={culture.id}
                className={`choice-item compact ${data.culture === culture.id ? 'selected' : ''}`}
                onClick={() => handleCultureSelection(culture.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {culture.icon}
                </div>
                <h3>{culture.name}</h3>
                <p>{culture.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="form-group">
          <label className="form-label">
            🎁 ¿Qué beneficio priorizas más?
          </label>
          <div className="choice-grid compact">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className={`choice-item compact ${data.benefits === benefit.id ? 'selected' : ''}`}
                onClick={() => handleBenefitSelection(benefit.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {benefit.icon}
                </div>
                <h3>{benefit.name}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPreferencesStep; 
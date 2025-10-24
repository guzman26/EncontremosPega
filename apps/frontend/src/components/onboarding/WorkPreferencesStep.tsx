import React from 'react';
import { FormStepProps } from '../../types';

const WorkPreferencesStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const locationOptions = [
    { id: 'remote', name: 'Remoto', description: 'Trabajo 100% desde casa', icon: '🏠' },
    { id: 'hybrid', name: 'Híbrido', description: 'Combinación de remoto y presencial', icon: '🔄' },
    { id: 'office', name: 'Presencial', description: 'Trabajo en oficina', icon: '🏢' },
  ];

  const scheduleOptions = [
    { id: 'full-time', name: 'Tiempo Completo', description: '40 horas por semana', icon: '⏰' },
    { id: 'part-time', name: 'Tiempo Parcial', description: 'Menos de 30 horas', icon: '🕐' },
    { id: 'flexible', name: 'Horario Flexible', description: 'Horarios adaptables', icon: '⚡' },
  ];

  const salaryRanges = [
    { id: 'entry', name: 'Recién Egresado', description: '$400.000 - $800.000', icon: '🌱' },
    { id: 'junior', name: 'Junior', description: '$800.000 - $1.200.000', icon: '📈' },
    { id: 'mid', name: 'Semi-Senior', description: '$1.200.000 - $1.800.000', icon: '💼' },
    { id: 'senior', name: 'Senior', description: '$1.800.000+', icon: '🚀' },
  ];

  const handleLocationChange = (location: string) => {
    onUpdate({ location });
  };

  const handleScheduleChange = (schedule: string) => {
    onUpdate({ schedule });
  };

  const handleSalaryChange = (salary: string) => {
    onUpdate({ salary });
  };

  return (
    <>
      <div className="step-content">
        {/* Location Preference */}
        <div className="preference-section">
          <div className="step-header">
            <h3>📍 ¿Dónde prefieres trabajar?</h3>
          </div>
          <div className="preference-grid">
            {locationOptions.map((location) => (
              <div
                key={location.id}
                className={`preference-card ${data.location === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationChange(location.id)}
              >
                <div className="preference-icon">{location.icon}</div>
                <div className="preference-content">
                  <h4>{location.name}</h4>
                  <p>{location.description}</p>
                </div>
                {data.location === location.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preference */}
        <div className="preference-section">
          <div className="step-header">
            <h3>⏱️ ¿Qué tipo de horario prefieres?</h3>
          </div>
          <div className="preference-grid">
            {scheduleOptions.map((schedule) => (
              <div
                key={schedule.id}
                className={`preference-card ${data.schedule === schedule.id ? 'selected' : ''}`}
                onClick={() => handleScheduleChange(schedule.id)}
              >
                <div className="preference-icon">{schedule.icon}</div>
                <div className="preference-content">
                  <h4>{schedule.name}</h4>
                  <p>{schedule.description}</p>
                </div>
                {data.schedule === schedule.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Expectation */}
        <div className="preference-section">
          <div className="step-header">
            <h3>💰 ¿Cuáles son tus expectativas salariales?</h3>
          </div>
          <div className="preference-grid">
            {salaryRanges.map((salary) => (
              <div
                key={salary.id}
                className={`preference-card ${data.salary === salary.id ? 'selected' : ''}`}
                onClick={() => handleSalaryChange(salary.id)}
              >
                <div className="preference-icon">{salary.icon}</div>
                <div className="preference-content">
                  <h4>{salary.name}</h4>
                  <p>{salary.description}</p>
                </div>
                {data.salary === salary.id && (
                  <div className="preference-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <h3>🎉 ¡Excelente!</h3>
          <p>
            Has completado tu perfil profesional. Estamos listos para encontrar las mejores 
            oportunidades que coincidan con tus intereses y preferencias. ¡Vamos a ver qué 
            empresas están buscando talento como el tuyo!
          </p>
        </div>
      </div>
    </>
  );
};

export default WorkPreferencesStep; 
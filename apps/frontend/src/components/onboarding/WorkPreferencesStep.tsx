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

      <div className="step-form">
        {/* Location Preference */}
        <div className="form-group">
          <label className="form-label">
            📍 ¿Dónde prefieres trabajar?
          </label>
          <div className="choice-grid compact">
            {locationOptions.map((location) => (
              <div
                key={location.id}
                className={`choice-item compact ${data.location === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationChange(location.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {location.icon}
                </div>
                <h3>{location.name}</h3>
                <p>{location.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Preference */}
        <div className="form-group">
          <label className="form-label">
            ⏱️ ¿Qué tipo de horario prefieres?
          </label>
          <div className="choice-grid compact">
            {scheduleOptions.map((schedule) => (
              <div
                key={schedule.id}
                className={`choice-item compact ${data.schedule === schedule.id ? 'selected' : ''}`}
                onClick={() => handleScheduleChange(schedule.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {schedule.icon}
                </div>
                <h3>{schedule.name}</h3>
                <p>{schedule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Expectation */}
        <div className="form-group">
          <label className="form-label">
            💰 ¿Cuáles son tus expectativas salariales?
          </label>
          <div className="choice-grid compact">
            {salaryRanges.map((salary) => (
              <div
                key={salary.id}
                className={`choice-item compact ${data.salary === salary.id ? 'selected' : ''}`}
                onClick={() => handleSalaryChange(salary.id)}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>
                  {salary.icon}
                </div>
                <h3>{salary.name}</h3>
                <p>{salary.description}</p>
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
import React from 'react';
import { FormStepProps } from '../../types';

const InterestsStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const interests = [
    { id: 'marketing', name: 'Marketing Digital', icon: '📈', subtitle: 'Performance, Growth, Content' },
    { id: 'finance', name: 'Finanzas', icon: '💰', subtitle: 'Fintech, Inversiones, CFO' },
    { id: 'operations', name: 'Operaciones', icon: '⚙️', subtitle: 'Procesos, Logística, Ops' },
    { id: 'pricing', name: 'Pricing & Revenue', icon: '💲', subtitle: 'Monetización, Revenue Ops' },
    { id: 'strategy', name: 'Estrategia Empresarial', icon: '🎯', subtitle: 'Business Strategy, M&A' },
    { id: 'product', name: 'Gestión de Productos', icon: '📱', subtitle: 'Product Management, UX' },
    { id: 'sales', name: 'Ventas', icon: '🤝', subtitle: 'B2B, B2C, Sales Ops' },
    { id: 'hr', name: 'Recursos Humanos', icon: '👥', subtitle: 'People Ops, Talent, Culture' },
    { id: 'analytics', name: 'Analytics & Data', icon: '📊', subtitle: 'Data Science, BI, ML' },
    { id: 'tech', name: 'Tecnología', icon: '💻', subtitle: 'Software, DevOps, Cloud' },
    { id: 'design', name: 'Diseño & UX', icon: '🎨', subtitle: 'UI/UX, Brand, Creative' },
    { id: 'legal', name: 'Legal & Compliance', icon: '⚖️', subtitle: 'Corporate, IP, Compliance' },
  ];

  const selectedInterests = data.interests || [];

  const handleInterestToggle = (interestId: string) => {
    const isSelected = selectedInterests.includes(interestId);
    let newInterests;
    
    if (isSelected) {
      newInterests = selectedInterests.filter((id: string) => id !== interestId);
    } else {
      newInterests = [...selectedInterests, interestId];
    }
    
    onUpdate({ interests: newInterests });
  };

  return (
    <>
      <div className="step-content">
        <div className="step-header">
          <h3>🎯 Selecciona tus Áreas de Interés</h3>
          <p>Elige al menos 2 áreas en las que te gustaría crecer</p>
        </div>

        <div className="interests-grid">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`interest-card ${
                selectedInterests.includes(interest.id) ? 'selected' : ''
              }`}
              onClick={() => handleInterestToggle(interest.id)}
            >
              <div className="interest-icon">{interest.icon}</div>
              <div className="interest-content">
                <h4>{interest.name}</h4>
                <p>{interest.subtitle}</p>
              </div>
              {selectedInterests.includes(interest.id) && (
                <div className="interest-check">✓</div>
              )}
            </div>
          ))}
        </div>

        {selectedInterests.length < 2 && (
          <div className="alert alert-info">
            💡 Selecciona al menos 2 áreas para continuar
          </div>
        )}
      </div>
    </>
  );
};

export default InterestsStep; 
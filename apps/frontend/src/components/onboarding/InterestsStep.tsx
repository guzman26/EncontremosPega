import React from 'react';
import { FormStepProps } from '../../types';

const InterestsStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const interests = [
    { id: 'marketing', name: 'Marketing Digital', icon: '📈' },
    { id: 'finance', name: 'Finanzas', icon: '💰' },
    { id: 'operations', name: 'Operaciones', icon: '⚙️' },
    { id: 'pricing', name: 'Pricing & Revenue', icon: '💲' },
    { id: 'strategy', name: 'Estrategia Empresarial', icon: '🎯' },
    { id: 'product', name: 'Gestión de Productos', icon: '📱' },
    { id: 'sales', name: 'Ventas', icon: '🤝' },
    { id: 'hr', name: 'Recursos Humanos', icon: '👥' },
    { id: 'analytics', name: 'Analytics & Data', icon: '📊' },
    { id: 'tech', name: 'Tecnología', icon: '💻' },
    { id: 'design', name: 'Diseño & UX', icon: '🎨' },
    { id: 'legal', name: 'Legal & Compliance', icon: '⚖️' },
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

      <div className="step-form">
        <div className="choice-grid">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`choice-item ${
                selectedInterests.includes(interest.id) ? 'selected' : ''
              }`}
              onClick={() => handleInterestToggle(interest.id)}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>
                {interest.icon}
              </div>
              <h3>{interest.name}</h3>
              <p>
                {interest.id === 'marketing' && 'Performance, Growth, Content'}
                {interest.id === 'finance' && 'Fintech, Inversiones, CFO'}
                {interest.id === 'operations' && 'Procesos, Logística, Ops'}
                {interest.id === 'pricing' && 'Monetización, Revenue Ops'}
                {interest.id === 'strategy' && 'Business Strategy, M&A'}
                {interest.id === 'product' && 'Product Management, UX'}
                {interest.id === 'sales' && 'B2B, B2C, Sales Ops'}
                {interest.id === 'hr' && 'People Ops, Talent, Culture'}
                {interest.id === 'analytics' && 'Data Science, BI, ML'}
                {interest.id === 'tech' && 'Software, DevOps, Cloud'}
                {interest.id === 'design' && 'UI/UX, Brand, Creative'}
                {interest.id === 'legal' && 'Corporate, IP, Compliance'}
              </p>
            </div>
          ))}
        </div>

        {selectedInterests.length < 2 && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'rgba(249, 115, 22, 0.1)', 
            border: '1px solid rgba(249, 115, 22, 0.3)',
            borderRadius: '12px',
            color: '#ea580c',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            💡 Selecciona al menos 2 áreas para continuar
          </div>
        )}
      </div>
    </>
  );
};

export default InterestsStep; 
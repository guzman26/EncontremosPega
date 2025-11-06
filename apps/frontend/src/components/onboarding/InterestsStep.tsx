import React, { useState, useEffect } from 'react';
import { FormStepProps } from '../../types';

interface InterestCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
}

const InterestsStep: React.FC<FormStepProps> = ({ data, onUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>(
    data.selectedSubcategories || {}
  );

  // Sync state when data changes
  useEffect(() => {
    if (data.selectedSubcategories) {
      setSelectedSubcategories(data.selectedSubcategories);
    }
  }, [data.selectedSubcategories]);

  const interestCategories: InterestCategory[] = [
    {
      id: 'finanzas',
      name: 'Finanzas',
      icon: '💰',
      description: 'Gestión financiera y estrategias de inversión',
      subcategories: [
        'Finanzas Corporativas',
        'Renta Fija',
        'Private Equity',
        'Private Credit',
        'Análisis de Inversiones',
        'Banca de Inversión',
        'Gestión de Riesgos',
        'Fintech',
        'CFO & Contabilidad',
        'Tesorería',
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing Digital',
      icon: '📈',
      description: 'Estrategias de crecimiento y promoción',
      subcategories: [
        'Marketing de Performance',
        'Growth Marketing',
        'Content Marketing',
        'SEO & SEM',
        'Marketing en Redes Sociales',
        'Email Marketing',
        'Marketing de Influencers',
        'Branding',
        'Marketing Analytics',
      ],
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      icon: '💻',
      description: 'Desarrollo de software y sistemas',
      subcategories: [
        'Desarrollo Frontend',
        'Desarrollo Backend',
        'Full Stack',
        'DevOps',
        'Cloud Computing',
        'Seguridad Informática',
        'Arquitectura de Software',
        'Mobile Development',
        'Inteligencia Artificial',
      ],
    },
    {
      id: 'producto',
      name: 'Gestión de Productos',
      icon: '📱',
      description: 'Estrategia y desarrollo de productos',
      subcategories: [
        'Product Management',
        'Product Strategy',
        'UX Research',
        'User Experience (UX)',
        'Product Analytics',
        'Roadmap Planning',
        'Product Marketing',
      ],
    },
    {
      id: 'ventas',
      name: 'Ventas',
      icon: '🤝',
      description: 'Estrategias comerciales y desarrollo de negocios',
      subcategories: [
        'Ventas B2B',
        'Ventas B2C',
        'Sales Operations',
        'Account Management',
        'Business Development',
        'Inside Sales',
        'Ventas Técnicas',
      ],
    },
    {
      id: 'operaciones',
      name: 'Operaciones',
      icon: '⚙️',
      description: 'Optimización de procesos y logística',
      subcategories: [
        'Operations Management',
        'Supply Chain',
        'Logística',
        'Procesos de Negocio',
        'Operaciones Tecnológicas',
        'Calidad y Eficiencia',
      ],
    },
    {
      id: 'analitica',
      name: 'Analytics & Data',
      icon: '📊',
      description: 'Análisis de datos y ciencia de datos',
      subcategories: [
        'Data Science',
        'Business Intelligence',
        'Machine Learning',
        'Data Engineering',
        'Analytics de Negocio',
        'Estadística Aplicada',
      ],
    },
    {
      id: 'diseno',
      name: 'Diseño & UX',
      icon: '🎨',
      description: 'Diseño visual y experiencia de usuario',
      subcategories: [
        'Diseño UI/UX',
        'Diseño Gráfico',
        'Branding Visual',
        'Diseño de Producto',
        'Diseño de Interacción',
        'Ilustración',
      ],
    },
    {
      id: 'recursos-humanos',
      name: 'Recursos Humanos',
      icon: '👥',
      description: 'Gestión de talento y cultura organizacional',
      subcategories: [
        'Reclutamiento',
        'People Operations',
        'Compensación y Beneficios',
        'Desarrollo Organizacional',
        'Cultura Corporativa',
        'HR Analytics',
      ],
    },
    {
      id: 'estrategia',
      name: 'Estrategia Empresarial',
      icon: '🎯',
      description: 'Planificación estratégica y consultoría',
      subcategories: [
        'Business Strategy',
        'Consultoría',
        'M&A (Fusiones y Adquisiciones)',
        'Transformación Digital',
        'Innovación',
        'Planificación Estratégica',
      ],
    },
    {
      id: 'legal',
      name: 'Legal & Compliance',
      icon: '⚖️',
      description: 'Aspectos legales y cumplimiento normativo',
      subcategories: [
        'Derecho Corporativo',
        'Compliance',
        'Propiedad Intelectual',
        'Contratos',
        'Regulación Financiera',
        'Derecho Laboral',
      ],
    },
    {
      id: 'pricing',
      name: 'Pricing & Revenue',
      icon: '💲',
      description: 'Monetización y optimización de ingresos',
      subcategories: [
        'Revenue Operations',
        'Pricing Strategy',
        'Monetización',
        'Revenue Analytics',
        'Ingresos Recurrentes',
      ],
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSubcategoryToggle = (categoryId: string, subcategory: string) => {
    const currentSubs = selectedSubcategories[categoryId] || [];
    const isSelected = currentSubs.includes(subcategory);
    
    let newSubs;
    if (isSelected) {
      newSubs = currentSubs.filter((sub: string) => sub !== subcategory);
    } else {
      newSubs = [...currentSubs, subcategory];
    }

    const updated = {
      ...selectedSubcategories,
      [categoryId]: newSubs.length > 0 ? newSubs : undefined,
    };

    // Remove empty categories
    if (newSubs.length === 0) {
      delete updated[categoryId];
    }

    setSelectedSubcategories(updated);
    onUpdate({ interests: Object.keys(updated), selectedSubcategories: updated });
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedSubcategories).reduce((sum, subs) => sum + subs.length, 0);
  };

  const currentCategory = selectedCategory 
    ? interestCategories.find(cat => cat.id === selectedCategory)
    : null;

  // Show subcategories view
  if (selectedCategory && currentCategory) {
    const selectedSubs = selectedSubcategories[selectedCategory] || [];
    
    return (
      <div className="step-content">
        <div className="step-header">
          <button 
            onClick={handleBackToCategories}
            className="back-button"
          >
            ← Volver a Categorías
          </button>
          <h3>{currentCategory.icon} {currentCategory.name}</h3>
          <p>{currentCategory.description}</p>
          <p className="subcategory-hint">Selecciona las áreas específicas que te interesan</p>
        </div>

        <div className="subcategories-grid">
          {currentCategory.subcategories.map((subcategory) => {
            const isSelected = selectedSubs.includes(subcategory);
            return (
              <div
                key={subcategory}
                className={`subcategory-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSubcategoryToggle(selectedCategory, subcategory)}
              >
                <div className="subcategory-content">
                  <h4>{subcategory}</h4>
                </div>
                {isSelected && (
                  <div className="subcategory-check">✓</div>
                )}
              </div>
            );
          })}
        </div>

        {selectedSubs.length > 0 && (
          <div className="selected-count">
            {selectedSubs.length} {selectedSubs.length === 1 ? 'área seleccionada' : 'áreas seleccionadas'} en {currentCategory.name}
          </div>
        )}
      </div>
    );
  }

  // Show main categories view
  const selectedCategories = Object.keys(selectedSubcategories);
  const totalSelected = getTotalSelectedCount();

  return (
    <div className="step-content">
      <div className="step-header">
        <h3>🎯 Selecciona tus Áreas de Interés</h3>
        <p>Elige las categorías que te interesan y luego selecciona las áreas específicas</p>
        {totalSelected > 0 && (
          <p className="selection-summary">
            Has seleccionado {totalSelected} {totalSelected === 1 ? 'área' : 'áreas'} en {selectedCategories.length} {selectedCategories.length === 1 ? 'categoría' : 'categorías'}
          </p>
        )}
      </div>

      <div className="interests-grid">
        {interestCategories.map((category) => {
          const hasSelection = selectedCategories.includes(category.id);
          const subCount = selectedSubcategories[category.id]?.length || 0;
          
          return (
            <div
              key={category.id}
              className={`interest-card ${hasSelection ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="interest-icon">{category.icon}</div>
              <div className="interest-content">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
                {subCount > 0 && (
                  <span className="subcategory-badge">
                    {subCount} {subCount === 1 ? 'área' : 'áreas'} seleccionada{subCount === 1 ? '' : 's'}
                  </span>
                )}
              </div>
              {hasSelection && (
                <div className="interest-check">✓</div>
              )}
              <div className="interest-arrow">→</div>
            </div>
          );
        })}
      </div>

      {totalSelected < 2 && (
        <div className="alert alert-info">
          💡 Selecciona al menos 2 áreas específicas para continuar
        </div>
      )}
    </div>
  );
};

export default InterestsStep; 
import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';

interface CompanyFormData {
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  culture: string[];
  benefits: string[];
  openPositions: string[];
  rating: number;
  website: string;
  tags: string[];
}

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    logo: '',
    description: '',
    industry: '',
    size: '',
    location: '',
    culture: [],
    benefits: [],
    openPositions: [],
    rating: 4.0,
    website: '',
    tags: []
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [positionsInput, setPositionsInput] = useState('');

  const industries = [
    'fintech', 'banking', 'ecommerce', 'foodtech', 
    'hrtech', 'consulting', 'telecommunications', 
    'mining', 'retail'
  ];

  const sizeOptions = ['startup', 'medium', 'large'];

  const cultureOptions = [
    'Innovación y Tecnología',
    'Work-Life Balance',
    'Crecimiento Profesional',
    'Trabajo en Equipo',
    'Autonomía',
    'Data-Driven',
    'Crecimiento Rápido',
    'Ambiente Competitivo',
    'Diversidad e Inclusión',
    'Mentorship'
  ];

  const benefitOptions = [
    'Trabajo Remoto',
    'Horarios Flexibles',
    'Seguro de Salud',
    'Vacaciones Flexibles',
    'Bonos por Desempeño',
    'Capacitación y Cursos',
    'Stock Options',
    'Equipos de Trabajo',
    'Gimnasio',
    'Comida Gratis'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleMultiSelectChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagsInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handlePositionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPositionsInput(value);
    const positions = value.split(',').map(pos => pos.trim()).filter(pos => pos);
    setFormData(prev => ({
      ...prev,
      openPositions: positions
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ Empresa "${result.company.name}" creada exitosamente!`);
        // Reset form
        setFormData({
          name: '',
          logo: '',
          description: '',
          industry: '',
          size: '',
          location: '',
          culture: [],
          benefits: [],
          openPositions: [],
          rating: 4.0,
          website: '',
          tags: []
        });
        setTagsInput('');
        setPositionsInput('');
      } else {
        setError(`❌ Error: ${result.error}`);
      }
    } catch (err) {
      setError('❌ Error de conexión. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '2rem auto', 
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '2rem'
      }}>
        🔐 Panel de Administración - Agregar Empresa
      </h1>

      {message && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Basic Information */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Logo URL
            </label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Descripción *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Industria *
            </label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="">Seleccionar...</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Tamaño *
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="">Seleccionar...</option>
              {sizeOptions.map(size => (
                <option key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Rating (1-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
              step="0.1"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Ubicación *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Santiago, Chile"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://empresa.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Culture */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Cultura Empresarial
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {cultureOptions.map(culture => (
              <label key={culture} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.culture.includes(culture)}
                  onChange={() => handleMultiSelectChange('culture', culture)}
                />
                <span style={{ fontSize: '0.9rem' }}>{culture}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Beneficios
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {benefitOptions.map(benefit => (
              <label key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.benefits.includes(benefit)}
                  onChange={() => handleMultiSelectChange('benefits', benefit)}
                />
                <span style={{ fontSize: '0.9rem' }}>{benefit}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Posiciones Abiertas (separadas por comas)
            </label>
                         <input
               type="text"
               value={positionsInput}
               onChange={handlePositionsChange}
               placeholder="Frontend Developer, Backend Engineer"
               style={{
                 width: '100%',
                 padding: '0.75rem',
                 border: '1px solid #ddd',
                 borderRadius: '6px',
                 fontSize: '1rem'
               }}
             />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Tags (separados por comas)
            </label>
                         <input
               type="text"
               value={tagsInput}
               onChange={handleTagsChange}
               placeholder="tech, finance, product"
               style={{
                 width: '100%',
                 padding: '0.75rem',
                 border: '1px solid #ddd',
                 borderRadius: '6px',
                 fontSize: '1rem'
               }}
             />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '1rem 2rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {loading ? '⏳ Creando empresa...' : '✅ Crear Empresa'}
        </button>
      </form>
    </div>
  );
};

export default AdminPage; 
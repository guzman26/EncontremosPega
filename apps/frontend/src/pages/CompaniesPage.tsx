import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Company } from '../types';
import type { Industry } from '../types/api.types';
import { apiService } from '../services/api';
import './CompaniesPage.css';

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const COMPANY_SIZE_ORDER: Record<string, number> = {
    startup: 1,
    medium: 2,
    large: 3,
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [companiesData, industriesData] = await Promise.all([
          apiService.getAllCompanies(),
          apiService.getIndustries()
        ]);
        setCompanies(companiesData);
        setIndustries(industriesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error cargando datos';
        setError(errorMessage);
        console.error('Error loading companies data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry =
        selectedIndustry === 'all' ||
        company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

      const matchesSize = selectedSize === 'all' || company.size === selectedSize;
      const matchesRating = company.rating >= minRating;

      return matchesSearch && matchesIndustry && matchesSize && matchesRating;
    });

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'industry':
          return a.industry.localeCompare(b.industry);
        case 'size':
          return (COMPANY_SIZE_ORDER[a.size] || 0) - (COMPANY_SIZE_ORDER[b.size] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [companies, searchTerm, selectedIndustry, selectedSize, minRating, sortBy]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedIndustry('all');
    setSelectedSize('all');
    setMinRating(0);
    setSortBy('name');
  }, []);

  const handleOpenWebsite = useCallback((website: string) => {
    window.open(website, '_blank');
  }, []);

  const renderLoadingState = () => (
    <div className="companies-page loading">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Cargando empresas...</h2>
        <p>Obteniendo la información más actualizada</p>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="companies-page error">
      <div className="error-container">
        <h2>⚠️ Error al cargar empresas</h2>
        <p>{error}</p>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    </div>
  );

  const renderNoResults = () => (
    <div className="no-results">
      <div className="no-results-icon">🔍</div>
      <h3>No se encontraron resultados</h3>
      <p>Prueba ajustando tus filtros de búsqueda</p>
      <button onClick={clearFilters} className="btn-primary">
        Ver todas las empresas
      </button>
    </div>
  );

  const renderCompanyCard = (company: Company) => (
    <div key={company.id} className={`company-card ${viewMode}`}>
      <div className="company-header">
        <div className="company-logo">
          <img src={company.logo} alt={company.name} />
        </div>
        <div className="company-info">
          <h3>{company.name}</h3>
          <p className="company-industry">{company.industry}</p>
          <div className="company-rating">
            {'★'.repeat(Math.floor(company.rating))} {company.rating}
          </div>
        </div>
        <div className="company-meta">
          <span className="size-badge">{company.size}</span>
          <span className="location">{company.location}</span>
        </div>
      </div>

      {viewMode === 'grid' && (
        <>
          <div className="company-description">
            <p>{company.description}</p>
          </div>

          <div className="company-details">
            <div className="company-culture">
              <h4>Cultura</h4>
              <div className="tags">
                {company.culture.slice(0, 3).map((cult, index) => (
                  <span key={index} className="tag">
                    {cult}
                  </span>
                ))}
              </div>
            </div>

            <div className="company-benefits">
              <h4>Beneficios</h4>
              <div className="tags">
                {company.benefits.slice(0, 3).map((benefit, index) => (
                  <span key={index} className="tag">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="company-positions">
              <h4>Posiciones Abiertas</h4>
              <ul>
                {company.openPositions.slice(0, 3).map((position, index) => (
                  <li key={index}>{position}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="company-actions">
        <button
          className="btn-primary"
          onClick={() => handleOpenWebsite(company.website)}
        >
          Ver Empresa
        </button>
        <button className="btn-secondary">
          Guardar
        </button>
      </div>
    </div>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();

  return (
    <div className="companies-page">
      <div className="companies-container">
        {/* Header */}
        <div className="companies-header">
          <h1>🏢 Directorio de Empresas</h1>
          <p>Explora {companies.length} empresas disponibles y encuentra tu próxima oportunidad</p>
        </div>

        {/* Filters and Search */}
        <div className="companies-filters">
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar empresas, industrias o posiciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>Industria</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todas las industrias</option>
                {industries.map(industry => (
                  <option key={industry.id} value={industry.name}>
                    {industry.name} ({industry.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Tamaño</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todos los tamaños</option>
                <option value="startup">Startup</option>
                <option value="medium">Mediana</option>
                <option value="large">Grande</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Rating mínimo</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="filter-select"
              >
                <option value={0}>Cualquier rating</option>
                <option value={3}>3+ estrellas</option>
                <option value={4}>4+ estrellas</option>
                <option value={4.5}>4.5+ estrellas</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Nombre</option>
                <option value="rating">Rating</option>
                <option value="industry">Industria</option>
                <option value="size">Tamaño</option>
              </select>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              🗑️ Limpiar filtros
            </button>
          </div>

          <div className="results-info">
            <div className="results-count">
              <span>
                Mostrando {filteredAndSortedCompanies.length} de {companies.length} empresas
              </span>
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⚏
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Companies Display */}
        <div className={`companies-display ${viewMode}`}>
          {filteredAndSortedCompanies.length === 0 ? renderNoResults() : filteredAndSortedCompanies.map(renderCompanyCard)}
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage; 
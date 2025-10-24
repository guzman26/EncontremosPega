import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile, Company } from '../types';
import type { RecommendationStats } from '../types/api.types';
import { apiService } from '../services/api';
import './RecommendationsPage.css';

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Company[]>([]);
  const [stats, setStats] = useState<RecommendationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const validateUserProfile = useCallback((profile: any): profile is UserProfile => {
    // Check if profile has the minimum required structure
    const hasMinimalData = (
      profile &&
      typeof profile === 'object' &&
      Array.isArray(profile.interests) &&
      profile.interests.length >= 2 &&
      profile.companyPreferences?.size &&
      profile.workPreferences?.location
    );

    console.log('Validating profile:', profile);
    console.log('Has minimal data:', hasMinimalData);

    return hasMinimalData;
  }, []);

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const profileData = localStorage.getItem('userProfile');
        if (!profileData) {
          navigate('/onboarding');
          return;
        }

        const profile = JSON.parse(profileData) as any;

        if (!validateUserProfile(profile)) {
          console.warn('Invalid profile structure, redirecting to onboarding');
          localStorage.removeItem('userProfile');
          navigate('/onboarding');
          return;
        }

        setUserProfile(profile);

        // Map profile to API format - simply pass the profile as-is since types are aligned
        const response = await apiService.getRecommendations(profile);
        setRecommendations(response.recommendations);
        setStats(response.stats);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error cargando recomendaciones';
        setError(errorMessage);
        console.error('Error loading recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [navigate, validateUserProfile]);

  const handleStartOver = useCallback(() => {
    localStorage.removeItem('userProfile');
    navigate('/onboarding');
  }, [navigate]);

  const handleExploreAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allCompanies = await apiService.getAllCompanies();
      setRecommendations(allCompanies);
      setStats(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error cargando empresas';
      setError(errorMessage);
      console.error('Error loading all companies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const navigateToCompanies = useCallback(() => {
    navigate('/companies');
  }, [navigate]);

  const renderLoadingState = () => (
    <div className="recommendations-page loading">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Analizando tu perfil...</h2>
        <p>Encontrando las mejores empresas para ti</p>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="recommendations-page error">
      <div className="error-container">
        <h2>⚠️ Error al cargar recomendaciones</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button className="btn-primary" onClick={handleStartOver}>
            Volver al Onboarding
          </button>
          <button className="btn-secondary" onClick={navigateToCompanies}>
            Ver Directorio de Empresas
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return renderLoadingState();
  if (error) return renderErrorState();
  if (!userProfile) return renderLoadingState();

  const userName = userProfile.personalInfo?.name?.split(' ')[0] || 'Usuario';

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        {/* Header */}
        <div className="recommendations-header">
          <h1>¡Hola {userName}! 👋</h1>
          <p>Basado en tu perfil, estas son las empresas que mejor se adaptan a ti:</p>
          <div className="profile-summary">
            <span className="tag">{userProfile.personalInfo?.career}</span>
            <span className="tag">{userProfile.interests?.length} intereses</span>
            <span className="tag">{userProfile.companyPreferences?.size}</span>
            <span className="tag">{userProfile.workPreferences?.location}</span>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <h3>📊 {stats
            ? `Encontramos ${stats.recommendedCompanies} empresas perfectas para ti`
            : `Explorando ${recommendations.length} empresas`
          }</h3>
          <div className="summary-stats">
            {stats ? (
              <>
                <div className="stat">
                  <span className="stat-number">{stats.topMatch}%</span>
                  <span className="stat-label">Mejor Match</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{stats.averageMatch}%</span>
                  <span className="stat-label">Match Promedio</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{stats.industries.length}</span>
                  <span className="stat-label">Industrias</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{stats.userInterests.length}</span>
                  <span className="stat-label">Intereses</span>
                </div>
              </>
            ) : (
              <>
                <div className="stat">
                  <span className="stat-number">
                    {recommendations.filter(c => c.matchPercentage && c.matchPercentage >= 85).length}
                  </span>
                  <span className="stat-label">Match Alto</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {recommendations.filter(c => c.size === userProfile?.companyPreferences?.size).length}
                  </span>
                  <span className="stat-label">Tamaño Ideal</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {recommendations.filter(c =>
                      c.culture.includes(userProfile?.companyPreferences?.culture || '')
                    ).length}
                  </span>
                  <span className="stat-label">Cultura Afín</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Company Cards */}
        <div className="companies-grid">
          {recommendations.length === 0 ? (
            <div className="no-results" style={{ gridColumn: '1/-1' }}>
              <div className="no-results-icon">🎯</div>
              <h3>Sin recomendaciones disponibles</h3>
              <p>No pudimos generar recomendaciones en este momento. Intenta:</p>
              <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
                <li>Cambiar tus preferencias</li>
                <li>Explorar el directorio completo de empresas</li>
              </ul>
              <button onClick={handleExploreAll} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Ver Todas las Empresas
              </button>
            </div>
          ) : (
            recommendations.map((company) => (
              <div key={company.id} className="company-card">
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
                {company.matchPercentage && (
                  <div className="match-badge">
                    {company.matchPercentage}% Match
                  </div>
                )}
              </div>

              <div className="company-description">
                <p>{company.description}</p>
              </div>

              <div className="company-details">
                <div className="detail-row">
                  <span className="detail-label">📍 Ubicación:</span>
                  <span>{company.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">👥 Tamaño:</span>
                  <span className="size-badge">{company.size}</span>
                </div>
              </div>

              <div className="company-culture">
                <h4>Cultura</h4>
                <div className="tags">
                  {company.culture.slice(0, 3).map((cult: string, index: number) => (
                    <span
                      key={index}
                      className={`tag ${userProfile?.companyPreferences?.culture === cult ? 'highlighted' : ''}`}
                    >
                      {cult}
                    </span>
                  ))}
                </div>
              </div>

              <div className="company-benefits">
                <h4>Beneficios</h4>
                <div className="tags">
                  {company.benefits.slice(0, 3).map((benefit: string, index: number) => (
                    <span
                      key={index}
                      className={`tag ${userProfile?.companyPreferences?.benefits === benefit ? 'highlighted' : ''}`}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="company-positions">
                <h4>Posiciones Abiertas</h4>
                <ul>
                  {company.openPositions.slice(0, 3).map((position: string, index: number) => (
                    <li key={index}>{position}</li>
                  ))}
                </ul>
              </div>

              <div className="company-actions">
                <button
                  className="btn-primary"
                  onClick={() => window.open(company.website, '_blank')}
                >
                  Ver Empresa
                </button>
                <button className="btn-secondary">
                  Guardar
                </button>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="recommendations-actions">
          <button
            className="btn-secondary"
            onClick={handleStartOver}
          >
            🔄 Cambiar Preferencias
          </button>
          <button
            className="btn-outline"
            onClick={handleExploreAll}
          >
            🔍 Ver Todas las Empresas (Aquí)
          </button>
          <button
            className="btn-primary"
            onClick={navigateToCompanies}
          >
            🏢 Explorar Directorio Completo
          </button>
        </div>

        {/* Floating Action Button */}
        <div className="floating-action">
          <button
            className="fab"
            onClick={navigateToCompanies}
            title="Ver directorio completo de empresas"
          >
            🏢
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage; 
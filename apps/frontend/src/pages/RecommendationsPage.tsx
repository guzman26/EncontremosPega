import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { Company, RecommendationStats, apiService } from '../services/api';
import './RecommendationsPage.css';

const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Company[]>([]);
  const [stats, setStats] = useState<RecommendationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = localStorage.getItem('userProfile');
    if (!profileData) {
      navigate('/onboarding');
      return;
    }

    const loadRecommendations = async () => {
      try {
        const profile = JSON.parse(profileData) as UserProfile;
        
        // Validate profile structure
        if (!profile.personalInfo || !profile.interests || !profile.companyPreferences || !profile.workPreferences) {
          console.warn('Invalid profile structure, redirecting to onboarding');
          localStorage.removeItem('userProfile');
          navigate('/onboarding');
          return;
        }
        
        setUserProfile(profile);

        // Map profile to API format
        const apiProfile = {
          email: profile.personalInfo?.email || '',
          name: profile.personalInfo?.name,
          interests: profile.interests,
          workPreferences: {
            location: profile.workPreferences?.location as 'remote' | 'hybrid' | 'office',
            schedule: profile.workPreferences?.schedule as 'full-time' | 'part-time'
          },
          companyPreferences: {
            size: profile.companyPreferences?.size as 'startup' | 'medium' | 'large',
            culture: profile.companyPreferences?.culture,
            benefits: profile.companyPreferences?.benefits
          }
        };

        // Get recommendations from backend
        const response = await apiService.getRecommendations(apiProfile);
        setRecommendations(response.recommendations);
        setStats(response.stats);
        setLoading(false);
      } catch (error) {
        console.error('Error loading recommendations:', error);
        localStorage.removeItem('userProfile');
        navigate('/onboarding');
      }
    };

    loadRecommendations();
  }, [navigate]);

  const handleStartOver = () => {
    localStorage.removeItem('userProfile');
    navigate('/onboarding');
  };

  const handleExploreAll = async () => {
    setLoading(true);
    try {
      const allCompanies = await apiService.getAllCompanies();
      setRecommendations(allCompanies);
      // Reset stats when showing all companies
      setStats(null);
    } catch (error) {
      console.error('Error loading all companies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="recommendations-page loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Analizando tu perfil...</h2>
          <p>Encontrando las mejores empresas para ti</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        {/* Header */}
        <div className="recommendations-header">
          <h1>¡Hola {userProfile?.personalInfo?.name?.split(' ')[0]}! 👋</h1>
          <p>Basado en tu perfil, estas son las empresas que mejor se adaptan a ti:</p>
          <div className="profile-summary">
            <span className="tag">{userProfile?.personalInfo?.career}</span>
            <span className="tag">{userProfile?.interests?.length} intereses</span>
            <span className="tag">{userProfile?.companyPreferences?.size}</span>
            <span className="tag">{userProfile?.workPreferences?.location}</span>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <h3>📊 {stats ? 
            `Encontramos ${stats.recommendedCompanies} empresas perfectas para ti` : 
            `Explorando ${recommendations.length} empresas`
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
                  <span className="stat-number">{recommendations.filter(c => c.matchPercentage && c.matchPercentage >= 85).length}</span>
                  <span className="stat-label">Match Alto</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{recommendations.filter(c => c.size === userProfile?.companyPreferences?.size).length}</span>
                  <span className="stat-label">Tamaño Ideal</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{recommendations.filter(c => 
                    c.culture.includes(userProfile?.companyPreferences?.culture || '')
                  ).length}</span>
                  <span className="stat-label">Cultura Afín</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Company Cards */}
        <div className="companies-grid">
          {recommendations.map((company) => (
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
                <div className="match-badge">
                  {company.matchPercentage}% Match
                </div>
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
                  {company.culture.slice(0, 3).map((cult, index) => (
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
                  {company.benefits.slice(0, 3).map((benefit, index) => (
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
                  {company.openPositions.slice(0, 3).map((position, index) => (
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
          ))}
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
            🔍 Ver Todas las Empresas
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage; 
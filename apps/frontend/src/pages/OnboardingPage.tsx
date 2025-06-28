import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, FormStep } from '../types';
import PersonalInfoStep from '../components/onboarding/PersonalInfoStep';
import InterestsStep from '../components/onboarding/InterestsStep';
import CompanyPreferencesStep from '../components/onboarding/CompanyPreferencesStep';
import WorkPreferencesStep from '../components/onboarding/WorkPreferencesStep';
import './OnboardingPage.css';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    personalInfo: {},
    interests: [],
    companyPreferences: {},
    workPreferences: {}
  });

  const steps: FormStep[] = [
    {
      id: 1,
      title: 'Tu Nivel',
      subtitle: 'Solo tu experiencia',
      component: PersonalInfoStep,
    },
    {
      id: 2,
      title: 'Tus Intereses',
      subtitle: 'Tecnologías que te gustan',
      component: InterestsStep,
    },
    {
      id: 3,
      title: 'Tipo de Empresa',
      subtitle: 'Tamaño y cultura ideal',
      component: CompanyPreferencesStep,
    },
    {
      id: 4,
      title: 'Modalidad de Trabajo',
      subtitle: 'Remoto, híbrido o presencial',
      component: WorkPreferencesStep,
    },
  ];

  const updateStepData = (stepData: any) => {
    setFormData(prev => {
      switch (currentStep) {
        case 0:
          return { ...prev, personalInfo: { ...prev.personalInfo, ...stepData } };
        case 1:
          return { ...prev, interests: stepData.interests || prev.interests };
        case 2:
          return { ...prev, companyPreferences: { ...prev.companyPreferences, ...stepData } };
        case 3:
          return { ...prev, workPreferences: { ...prev.workPreferences, ...stepData } };
        default:
          return prev;
      }
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save profile and navigate to results
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/recommendations');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        const personalInfo = formData.personalInfo as any;
        return Boolean(personalInfo?.level);
      case 1:
        return formData.interests && formData.interests.length >= 2;
      case 2:
        const companyPrefs = formData.companyPreferences;
        return Boolean(companyPrefs?.size && companyPrefs?.culture && companyPrefs?.benefits);
      case 3:
        const workPrefs = formData.workPreferences;
        return Boolean(workPrefs?.location && workPrefs?.schedule);
      default:
        return false;
    }
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 0:
        return formData.personalInfo || {};
      case 1:
        return { interests: formData.interests || [] };
      case 2:
        return formData.companyPreferences || {};
      case 3:
        return formData.workPreferences || {};
      default:
        return {};
    }
  };

  const getCurrentStep = steps[currentStep];
  const CurrentStepComponent = getCurrentStep.component;
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        {/* Progress Header */}
        <div className="progress-header">
          <h2>🎯 Encuentra tu empresa ideal</h2>
          <p>Paso {currentStep + 1} de {steps.length}: {getCurrentStep.title}</p>
          
          {/* Progress Bar */}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Step Dots */}
          <div className="step-indicator">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`step-dot ${
                  index === currentStep ? 'active' : 
                  index < currentStep ? 'completed' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="step-content">
          <CurrentStepComponent
            data={getCurrentStepData()}
            onUpdate={updateStepData}
          />

          {/* Navigation */}
          <div className="step-navigation">
            {currentStep > 0 ? (
              <button 
                onClick={handlePrevious}
                className="nav-button secondary"
              >
                ← Anterior
              </button>
            ) : (
              <div></div>
            )}
            
            <button 
              onClick={handleNext}
              className="nav-button primary"
              disabled={!isStepValid()}
            >
              {currentStep === steps.length - 1 ? (
                <>🎯 Ver Recomendaciones</>
              ) : (
                <>Siguiente →</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage; 
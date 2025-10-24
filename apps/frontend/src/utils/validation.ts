/**
 * Validation utilities
 */

// Email validation using regex
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if string is empty or just whitespace
export function isEmptyString(value: string | undefined | null): boolean {
  return value === undefined || value === null || value.trim() === '';
}

// Validate phone number (basic validation)
export function isValidPhone(phone: string): boolean {
  // Remove spaces, dashes, parentheses
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  // Check if it's a valid length and has only digits
  return /^\d{8,15}$/.test(cleanPhone);
}

// Validate company data for creation/editing
export function validateCompany(companyData: any) {
  const errors: Record<string, string> = {};
  
  if (isEmptyString(companyData.name)) {
    errors.name = 'El nombre de la empresa es obligatorio';
  }
  
  if (isEmptyString(companyData.industry)) {
    errors.industry = 'La industria es obligatoria';
  }
  
  if (isEmptyString(companyData.description)) {
    errors.description = 'La descripción es obligatoria';
  } else if (companyData.description.length < 20) {
    errors.description = 'La descripción debe tener al menos 20 caracteres';
  }
  
  if (companyData.website && !isValidUrl(companyData.website)) {
    errors.website = 'La URL del sitio web no es válida';
  }
  
  if (!companyData.size || !['startup', 'medium', 'large'].includes(companyData.size)) {
    errors.size = 'El tamaño de empresa seleccionado no es válido';
  }
  
  return errors;
}

// Validate user profile data for onboarding
export function validateUserProfile(profileData: any) {
  const errors: Record<string, string> = {};
  
  if (isEmptyString(profileData.email)) {
    errors.email = 'El email es obligatorio';
  } else if (!isValidEmail(profileData.email)) {
    errors.email = 'El email no es válido';
  }
  
  if (profileData.phone && !isValidPhone(profileData.phone)) {
    errors.phone = 'El número de teléfono no es válido';
  }
  
  if (profileData.age !== undefined && profileData.age !== null) {
    const age = Number(profileData.age);
    if (isNaN(age) || age < 18 || age > 100) {
      errors.age = 'La edad debe estar entre 18 y 100 años';
    }
  }
  
  if (profileData.interests?.length === 0) {
    errors.interests = 'Selecciona al menos un interés';
  }
  
  return errors;
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Company API Service
 */
import httpClient from '../http/httpClient';
import { Company } from '../../types/api.types';

class CompanyService {
  /**
   * Get all companies
   */
  async getAllCompanies(): Promise<Company[]> {
    return httpClient.get('/companies');
  }

  /**
   * Get a specific company by ID
   */
  async getCompanyById(id: string): Promise<Company> {
    return httpClient.get(`/companies/${id}`);
  }

  /**
   * Get companies by industry
   */
  async getCompaniesByIndustry(industry: string): Promise<Company[]> {
    return httpClient.get(`/companies/industry/${industry}`);
  }

  /**
   * Create a new company (admin only)
   */
  async createCompany(companyData: Partial<Company>): Promise<{message: string, company: Company}> {
    return httpClient.post('/companies', companyData);
  }
}

export default new CompanyService();

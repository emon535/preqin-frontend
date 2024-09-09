// services/investorApi.ts
import axios from 'axios';
import { InvestorType, InvestorDetailsType } from '../types/investorType';

// Fetch all investors
export const fetchInvestors = async (): Promise<InvestorType[]> => {
  const response = await axios.get('http://localhost:8000/api/v1/investors');
  return response.data;
};

// Fetch investor by ID
export const fetchInvestorById = async (id: number): Promise<InvestorDetailsType> => {
  const response = await axios.get(`http://localhost:8000/api/v1/investors/${id}`);
  return response.data;
};

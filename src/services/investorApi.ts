
import axios from 'axios';
import { InvestorType, InvestorDetailsType } from '../types/investorType';
import { API_URLS } from '../utils/configs';

// Fetch all investors
export const fetchInvestors = async (): Promise<InvestorType[]> => {
  const response = await axios.get(API_URLS.INVESTORS);
  return response.data;
};

// Fetch investor by ID
export const fetchInvestorById = async (id: number): Promise<InvestorDetailsType> => {
  const response = await axios.get(API_URLS.INVESTORS + `/${id}`);
  return response.data;
};

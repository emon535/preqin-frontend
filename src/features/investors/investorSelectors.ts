import { RootState } from '../../store/store';
import { InvestorType, InvestorDetailsType } from '../../types/investorType';


export const selectInvestors = (state: RootState): InvestorType[] => state.investors.list;
export const selectSelectedInvestor = (state: RootState): InvestorDetailsType | null => state.investors.selectedInvestor as InvestorDetailsType | null;
export const selectInvestorStatus = (state: RootState): 'idle' | 'loading' | 'succeeded' | 'failed' => state.investors.status;
export const selectInvestorError = (state: RootState): string | null => state.investors.error;

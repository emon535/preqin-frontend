export type Commitment = {
    asset_class: string;
    amount: number;
    currency: string;
    id: number;
  }

  

export type InvestorType =  {
    id: number;
    investor_name: string;
    investor_type: string;
    total_commitments: number;
    investor_country: string;
    investor_date_added: string;
  }

export type InvestorDetailsType = {
    id: number;
    investor_name: string;
    investor_type: string;
    investor_country: string;
    investor_date_added: string;
    investor_last_updated: string;
    total_commitments: number;
    commitments: Commitment[];

  }

  export type  InvestorStateType =  {
    list: InvestorType[];
    selectedInvestor: InvestorType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
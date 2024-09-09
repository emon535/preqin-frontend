
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchInvestors as fetchInvestorsApi, fetchInvestorById as fetchInvestorByIdApi } from '../../services/investorApi';
import { InvestorType, InvestorDetailsType, InvestorStateType } from '../../types/investorType';

// Initial state for investors
const initialState: InvestorStateType  = {
  list: [],
  selectedInvestor: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch all investors
export const fetchInvestors = createAsyncThunk(
  'investors/fetchInvestors',
  async () => {
    const investors = await fetchInvestorsApi();
    return investors;
  }
);

// Thunk to fetch an investor by ID with commitments
export const fetchInvestorById = createAsyncThunk(
  'investors/fetchInvestorById',
  async (id: number) => {
    const investor = await fetchInvestorByIdApi(id);
    return investor;
  }
);

const investorSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {
    selectInvestor(state, action: PayloadAction<InvestorType>) {
      state.selectedInvestor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchInvestors thunk
      .addCase(fetchInvestors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvestors.fulfilled, (state, action: PayloadAction<InvestorType[]>) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchInvestors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch investors';
      })
      // Handling fetchInvestorById thunk
      .addCase(fetchInvestorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvestorById.fulfilled, (state, action: PayloadAction<InvestorDetailsType>) => {
        state.status = 'succeeded';
        state.selectedInvestor = action.payload;
      })
      .addCase(fetchInvestorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch investor details';
      });
  },
});

export const { selectInvestor } = investorSlice.actions;
export default investorSlice.reducer;

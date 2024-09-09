import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Commitment {
  id: number;
  assetClass: string;
  amount: number;
}

interface CommitmentState {
  list: Commitment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommitmentState = {
  list: [],
  status: 'idle',
  error: null,
};

const commitmentSlice = createSlice({
  name: 'commitments',
  initialState,
  reducers: {
    setCommitments: (state, action: PayloadAction<Commitment[]>) => {
      state.list = action.payload;
    },
    clearCommitments: (state) => {
      state.list = [];
    },
  },
});

export const { setCommitments, clearCommitments } = commitmentSlice.actions;
export default commitmentSlice.reducer;
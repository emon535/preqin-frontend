import { configureStore } from '@reduxjs/toolkit';
import investorReducer from '../features/investors/investorSlice';
import commitmentReducer from '../features/commitments/commitmentSlice';


const store = configureStore({
  reducer: {
    investors: investorReducer,
    commitments: commitmentReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

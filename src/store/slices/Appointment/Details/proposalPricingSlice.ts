import {createSlice} from '@reduxjs/toolkit';
import {getProposalPricing} from './getProposalPricing';

const initialState: any = {
  proposalPricing: null,
  error: null,
  loading: false,
};

const proposalPricingSlice = createSlice({
  name: 'proposalPricing',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProposalPricing.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProposalPricing.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.proposalPricing = payload;
      })
      .addCase(getProposalPricing.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default proposalPricingSlice.reducer;

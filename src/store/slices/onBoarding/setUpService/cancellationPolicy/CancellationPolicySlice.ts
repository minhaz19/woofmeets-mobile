import {createSlice} from '@reduxjs/toolkit';
import {getCancellationPolicy, getSingleCancellationPolicy} from './getCancellationPolicy';

const initialState: any = {
  policy: null,
  singleProviderPolicy: null,
  error: null,
  loading: false,
};

const cancellationPolicySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    setPolicy: (state, {payload}) => {
      state.policy = payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getCancellationPolicy.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCancellationPolicy.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.policy = payload.data;
      })
      .addCase(getCancellationPolicy.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getSingleCancellationPolicy.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleCancellationPolicy.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.singleProviderPolicy = payload.data.id;
      })
      .addCase(getSingleCancellationPolicy.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {setPolicy} = cancellationPolicySlice.actions;
export default cancellationPolicySlice.reducer;

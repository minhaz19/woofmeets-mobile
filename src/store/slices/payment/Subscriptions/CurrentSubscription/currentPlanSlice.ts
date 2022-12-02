import {createSlice} from '@reduxjs/toolkit';
import {getCurrentplan} from './currentPlanAction';

const initialState: any = {
  currentPlan: null,
  error: null,
  loading: false,
};

const currentPlanSlice = createSlice({
  name: 'currentPlan',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getCurrentplan.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentplan.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.currentPlan = payload.data;
      })
      .addCase(getCurrentplan.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default currentPlanSlice.reducer;

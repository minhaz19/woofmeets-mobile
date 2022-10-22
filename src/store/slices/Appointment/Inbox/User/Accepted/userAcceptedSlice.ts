import {createSlice} from '@reduxjs/toolkit';
import {getUserAccepted} from './getUserAcceptedStatus';

const initialState: any = {
  userAccepted: null,
  error: null,
  loading: false,
};

const statusProposalSlice = createSlice({
  name: 'userAccepted',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserAccepted.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAccepted.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.userAccepted = payload.data;
      })
      .addCase(getUserAccepted.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default statusProposalSlice.reducer;

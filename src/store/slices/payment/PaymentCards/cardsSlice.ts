import {createSlice} from '@reduxjs/toolkit';
import {getCards} from './getCardsAction';

const initialState: any = {
  cards: null,
  error: null,
  loading: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.cards = payload.data;
      })
      .addCase(getCards.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default cardsSlice.reducer;

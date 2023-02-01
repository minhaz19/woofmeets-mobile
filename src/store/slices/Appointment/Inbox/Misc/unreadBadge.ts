import {createSlice} from '@reduxjs/toolkit';

export const unreadBadge = createSlice({
  name: 'badge',
  initialState: {badge: false},
  reducers: {
    setBadge: (state, action) => {
      state.badge = action.payload;
    },
  },
});
export const {setBadge} = unreadBadge.actions;

export default unreadBadge.reducer;

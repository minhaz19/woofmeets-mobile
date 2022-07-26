import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import addPetReducer from './slices/addPet';

import authReducer from './slices/auth';
import openFilter from './slices/openFilter';
import userLogin from './slices/userLogin';

const appReducer = combineReducers({
  auth: authReducer,
  addPet: addPetReducer,
  login: userLogin,
  filter: openFilter,
});

const RootReducer = (
  state:
    | CombinedState<{
        auth: {
          isLoggedIn: boolean;
          userResponse: null;
          userInfo: null;
          errorMessage: null;
          cognito: null;
          status: string;
        };
      }>
    | undefined,
  action: AnyAction,
) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  // @ts-ignore
  return appReducer(state, action);
};

const store = configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof RootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

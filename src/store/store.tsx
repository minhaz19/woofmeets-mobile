import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './slices/auth';

const appReducer = combineReducers({
  auth: authReducer,
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

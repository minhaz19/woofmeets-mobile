import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Store,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import addPetReducer from './slices/pet/addPet';
import authReducer from './slices/auth/userSlice';
import hittingCross from './slices/hittingCross';
import openFilter from './slices/openFilter';
import userProfileSlice from './slices/userProfile/userProfileSlice';
import contactReducer from './slices/profile/contact';
import breedsSlice from './slices/pet/breeds/breedsSlice';
import allPetsSlice from './slices/pet/allPets/allPetsSlice';
import petGallerySlice from './slices/pet/petGallery/petGallerySlice';
import singlePetSlice from './slices/pet/singlePet/singlePetSlice';
import servicesReducer from './slices/profile/services';
import detailsReducer from './slices/profile/details';
import PetPreferenceSlice from './slices/setUpService/petPreference/PetPreferenceSlice';

const appReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  addPet: addPetReducer,
  filter: openFilter,
  cross: hittingCross,
  userProfile: userProfileSlice,
  petBreeds: breedsSlice,
  allPets: allPetsSlice,
  petGallery: petGallerySlice,
  singlePet: singlePetSlice,
  petPreference: PetPreferenceSlice,
  services: servicesReducer,
  details: detailsReducer,
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

// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};

// you can also create some redux hooks using the above explicit types
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

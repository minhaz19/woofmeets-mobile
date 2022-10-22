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
import hittingCross from './slices/misc/hittingCross';
import openFilter from './slices/misc/openFilter';
import userProfileSlice from './slices/userProfile/userProfileSlice';
import contactReducer from './slices/profile/contact';
import breedsSlice from './slices/pet/breeds/breedsSlice';
import allPetsSlice from './slices/pet/allPets/allPetsSlice';
import petGallerySlice from './slices/pet/petGallery/petGallerySlice';
import singlePetSlice from './slices/pet/singlePet/singlePetSlice';
import servicesReducer from './slices/profile/services';
import detailsReducer from './slices/profile/details';
import PetPreferenceSlice from './slices/onBoarding/setUpService/petPreference/PetPreferenceSlice';
import serviceRateFieldSlice from './slices/onBoarding/setUpService/rates/Field/serviceRateFieldSlice';
import rateFieldValueSlice from './slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueSlice';
import availabilitySlice from './slices/onBoarding/setUpService/availability/availabilitySlice';
import serviceSetUpSlice from './slices/onBoarding/setUpService/serviceSetup/serviceSetUpSlice';
import providerProfileSlice from './slices/Provider/ProviderProfile/singlePet/providerProfileSlice';
import initial from './slices/onBoarding/initial';
import safetyQuizSlice from './slices/onBoarding/safetyQuiz/safetyQuizSlice';
import whoAmISlice from './slices/common/whoAmI/whoAmISlice';
import subscriptionSlice from './slices/payment/Subscriptions/SubscriptionPlans/subscriptionSlice';
import yourHomeSlice from './slices/onBoarding/setUpService/yourHome/yourHomeSlice';
import CancellationPolicySlice from './slices/onBoarding/setUpService/cancellationPolicy/CancellationPolicySlice';
import rescheduleSlice from './slices/Provider/reschedule/rescheduleSlice';
import allProviderSlice from './slices/Provider/allProvider/allProviderSlice';
import cardsSlice from './slices/payment/PaymentCards/cardsSlice';
import currentPlanSlice from './slices/payment/Subscriptions/CurrentSubscription/currentPlanSlice';
import providerServicesSlice from './slices/Appointment/ProviderServices/providerServicesSlice';
import addressReducer from './slices/address/address';
import markedStyle from './slices/misc/markedStyle';
import ProviderFilterSlice from './slices/Provider/ProviderFilter/ProviderFilterSlice';
import providerProposalSlice from './slices/Appointment/Proposal/providerProposalSlice';
import appointmentStatusSlice from './slices/Appointment/Inbox/User/Proposal/appointmentStatusSlice';
import ProviderApntStatusSlice from './slices/Appointment/Inbox/Provider/providerApntStatusSlice';
import userApmtRejectSlice from './slices/Appointment/Inbox/User/Recjected/userApmtRejectSlice';
import userApmtCancelSlice from './slices/Appointment/Inbox/User/Cancelled/userApmtCancelSlice';
import userAcceptedSlice from './slices/Appointment/Inbox/User/Accepted/userAcceptedSlice';

const appReducer = combineReducers({
  auth: authReducer,
  initial: initial,
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
  serviceRates: serviceRateFieldSlice,
  fieldValue: rateFieldValueSlice,
  providerProfile: providerProfileSlice,
  safetyQuiz: safetyQuizSlice,
  whoAmI: whoAmISlice,
  availability: availabilitySlice,
  serviceSetup: serviceSetUpSlice,
  subscription: subscriptionSlice,
  yourHome: yourHomeSlice,
  cancellationPolicy: CancellationPolicySlice,
  reschedule: rescheduleSlice,
  allProvider: allProviderSlice,
  cards: cardsSlice,
  currentPlan: currentPlanSlice,
  providerServices: providerServicesSlice,
  address: addressReducer,
  appointmentStatus: appointmentStatusSlice,
  providerApntStatus: ProviderApntStatusSlice,
  proposal: providerProposalSlice,
  markedStyle: markedStyle,
  providerFilter: ProviderFilterSlice,
  userRejected: userApmtRejectSlice,
  userCancelled: userApmtCancelSlice,
  userAccepted: userAcceptedSlice,
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

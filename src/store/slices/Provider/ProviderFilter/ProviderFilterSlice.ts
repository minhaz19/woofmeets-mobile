import {createSlice} from '@reduxjs/toolkit';
import {petData} from '../../../../screens/Service/FilterProvider/utils/petData';
import {days} from '../../../../utils/config/Data/filterProviderDatas';
import {getAllPets} from '../../pet/allPets/allPetsAction';

const initialState: any = {
  location: {
    lat: null,
    lng: null,
  },
  selectedPet: [],
  selectedHome: '',
  multiSliderValue: [0, 150],
  dropIn: null,
  dropOut: null,
  isService: {
    service: '',
    serviceId: '',
  },
  isYardEnabled: '',
  serviceFrequency: days,
  petType: petData,
  scheduleId: null,
  formattedData: {},
  loading: false,
  error: null,
};

const providerFilterSlice = createSlice({
  name: 'providerFilter',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setSelectedPet: (state, action) => {
      state.selectedPet = action.payload;
    },
    setSelectedHome: (state, action) => {
      state.selectedHome = action.payload;
    },
    setMultiSliderValue: (state, action) => {
      state.multiSliderValue = action.payload;
    },
    setDropIn: (state, action) => {
      state.dropIn = action.payload;
    },
    setDropOut: (state, action) => {
      state.dropOut = action.payload;
    },
    setIsService: (state, action) => {
      state.isService = action.payload;
    },
    setIsYardEnabled: (state, action) => {
      state.isYardEnabled = action.payload;
    },
    setServiceFrequency: (state, action) => {
      state.serviceFrequency = action.payload;
    },
    setPetType: (state, action) => {
      state.petType = action.payload;
    },
    setScheduleId: (state, action) => {
      state.scheduleId = action.payload;
    },
    setFormattedData: (state, action) => {
      state.formattedData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPets.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.pets = payload.data;
      })
      .addCase(getAllPets.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setLocation,
  setSelectedPet,
  setSelectedHome,
  setMultiSliderValue,
  setDropIn,
  setDropOut,
  setIsService,
  setIsYardEnabled,
  setServiceFrequency,
  setPetType,
  setScheduleId,
  setFormattedData,
} = providerFilterSlice.actions;

export default providerFilterSlice.reducer;

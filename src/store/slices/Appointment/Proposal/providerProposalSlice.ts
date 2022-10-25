import {createSlice} from '@reduxjs/toolkit';
import {getProviderProposal} from './getProviderProposal';

const initialState: any = {
  proposal: null,
  providerInfo: null,
  userInfo: null,
  proposedService: null,
  proposalInfo: null,
  proposedServiceInfo: null,
  error: null,
  loading: false,
};

const providerProposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getProviderProposal.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProviderProposal.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.proposal = payload.data;
        state.providerInfo = payload.data.appointment.provider.user;
        state.proposedService =
          payload.data.appointment.providerService.serviceType;
        state.userInfo = payload.data.appointment.user;
        state.proposalInfo = payload.data.proposal;
        state.proposedServiceInfo =
          payload.data.appointment.providerService.serviceTypeId === 1 ||
          payload.data.appointment.providerService.serviceTypeId === 2
            ? {
                userId: payload.data.appointment.user.id,
                providerId: payload.data.appointment.provider.id,
                appointmentOpk: payload.data.appointment.opk,
                proposedBy: payload.data.proposal.proposedBy,
                serviceName:
                  payload.data.appointment.providerService.serviceType.name,
                providerName:
                  payload.data.appointment.provider.user?.firstName +
                  ' ' +
                  payload.data.appointment.provider.user?.lastName,
                userName:
                  payload.data.appointment.user?.firstName +
                  ' ' +
                  payload.data.appointment.user?.lastName,
                image: payload.data.appointment.provider.user.image,
                serviceTypeId:
                  payload.data.appointment.providerService.serviceTypeId,
                petsInfo: payload.data.proposal.appointmentPet,
                dropOffStartTime: payload.data.proposal.dropOffStartTime,
                dropOffEndTime: payload.data.proposal.dropOffEndTime,
                pickUpStartTime: payload.data.proposal.pickUpStartTime,
                pickUpEndTime: payload.data.proposal.pickUpEndTime,
                proposalStartDate: payload.data.proposal.proposalStartDate,
                proposalEndDate: payload.data.proposal.proposalEndDate,
                firstMessage: payload.data.proposal.firstMessage,
                isRecivedPhotos: payload.data.proposal.isRecivedPhotos,
                appointmentPet: payload.data.proposal.appointmentPet,
                counter: payload.data.proposal.countered,
                status: payload.data.appointment.status,
              }
            : payload.data.appointment.providerService.serviceTypeId === 3 ||
              payload.data.appointment.providerService.serviceTypeId === 5
            ? {
                userId: payload.data.appointment.user.id,
                providerId: payload.data.appointment.provider.id,
                appointmentOpk: payload.data.appointment.opk,
                proposedBy: payload.data.proposal.proposedBy,
                serviceName:
                  payload.data.appointment.providerService.serviceType.name,
                serviceTypeId:
                  payload.data.appointment.providerService.serviceTypeId,
                providerName:
                  payload.data.appointment.provider.user.firstName +
                  ' ' +
                  payload.data.appointment.provider.user.lastName,
                image: payload.data.appointment.provider.user.image,
                appointmentserviceType:
                  payload.data.proposal.appointmentserviceType,
                isRecurring: payload.data.proposal.isRecurring,
                length: payload.data.proposal.length,
                recurringStartDate: payload.data.proposal.recurringStartDate,
                recurringSelectedDay:
                  payload.data.proposal.recurringSelectedDay,
                proposalOtherDate: payload.data.proposal.proposalOtherDate,
                petsInfo: payload.data.proposal.appointmentPet,
                firstMessage: payload.data.proposal.firstMessage,
                isRecivedPhotos: payload.data.proposal.isRecivedPhotos,
                appointmentPet: payload.data.proposal.appointmentPet,
                counter: payload.data.proposal.countered,
                status: payload.data.appointment.status,
              }
            : payload.data.appointment.providerService.serviceTypeId === 4
            ? {
                userId: payload.data.appointment.user.id,
                providerId: payload.data.appointment.provider.id,
                appointmentOpk: payload.data.appointment.opk,
                proposedBy: payload.data.proposal.proposedBy,
                serviceName:
                  payload.data.appointment.providerService.serviceType.name,
                serviceTypeId:
                  payload.data.appointment.providerService.serviceTypeId,
                providerName:
                  payload.data.appointment.provider.user.firstName +
                  ' ' +
                  payload.data.appointment.provider.user.lastName,
                image: payload.data.appointment.provider.user.image,
                dropOffStartTime: payload.data.proposal.dropOffStartTime,
                dropOffEndTime: payload.data.proposal.dropOffEndTime,
                pickUpStartTime: payload.data.proposal.pickUpStartTime,
                pickUpEndTime: payload.data.proposal.pickUpEndTime,
                proposalOtherDate: payload.data.proposal.proposalOtherDate,
                petsInfo: payload.data.proposal.appointmentPet,
                isRecurring: payload.data.proposal.isRecurring,
                recurringStartDate: payload.data.proposal.recurringStartDate,
                recurringSelectedDay:
                  payload.data.proposal.recurringSelectedDay,
                firstMessage: payload.data.proposal.firstMessage,
                isRecivedPhotos: payload.data.proposal.isRecivedPhotos,
                appointmentPet: payload.data.proposal.appointmentPet,
                counter: payload.data.proposal.countered,
                status: payload.data.appointment.status,
              }
            : null;
      })
      .addCase(getProviderProposal.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default providerProposalSlice.reducer;

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
        const modpayload = payload?.data;
        state.loading = false;
        state.proposal = modpayload;
        state.providerInfo = modpayload.appointment.provider.user;
        state.proposedService =
          modpayload.appointment.providerService.serviceType;
        state.userInfo = modpayload.appointment.user;
        state.proposalInfo = modpayload.proposal;
        state.proposedServiceInfo =
          modpayload.appointment.providerService.serviceTypeId === 1 ||
          modpayload.appointment.providerService.serviceTypeId === 2
            ? {
                userId: modpayload.appointment.user.id,
                providerId: modpayload.appointment.provider.id,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                providerName:
                  modpayload.appointment.provider.user?.firstName +
                  ' ' +
                  modpayload.appointment.provider.user?.lastName,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                image: modpayload.appointment.provider.user.image,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                petsInfo: modpayload.proposal.appointmentPet,
                dropOffStartTime: modpayload.proposal.dropOffStartTime,
                dropOffEndTime: modpayload.proposal.dropOffEndTime,
                pickUpStartTime: modpayload.proposal.pickUpStartTime,
                pickUpEndTime: modpayload.proposal.pickUpEndTime,
                proposalStartDate: modpayload.proposal.proposalStartDate,
                proposalEndDate: modpayload.proposal.proposalEndDate,
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
              }
            : modpayload.appointment.providerService.serviceTypeId === 3 ||
              modpayload.appointment.providerService.serviceTypeId === 5
            ? {
                userId: modpayload.appointment.user.id,
                providerId: modpayload.appointment.provider.id,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                providerName:
                  modpayload.appointment.provider.user.firstName +
                  ' ' +
                  modpayload.appointment.provider.user.lastName,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                image: modpayload.appointment.provider.user.image,
                appointmentserviceType:
                  modpayload.proposal.appointmentserviceType,
                isRecurring: modpayload.proposal.isRecurring,
                length: modpayload.proposal.length,
                recurringStartDate: modpayload.proposal.recurringStartDate,
                recurringSelectedDay: modpayload.proposal.recurringSelectedDay,
                proposalOtherDate: modpayload.proposal.proposalOtherDate,
                petsInfo: modpayload.proposal.appointmentPet,
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
              }
            : modpayload.appointment.providerService.serviceTypeId === 4
            ? {
                userId: modpayload.appointment.user.id,
                providerId: modpayload.appointment.provider.id,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                providerName:
                  modpayload.appointment.provider.user.firstName +
                  ' ' +
                  modpayload.appointment.provider.user.lastName,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                image: modpayload.appointment.provider.user.image,
                dropOffStartTime: modpayload.proposal.dropOffStartTime,
                dropOffEndTime: modpayload.proposal.dropOffEndTime,
                pickUpStartTime: modpayload.proposal.pickUpStartTime,
                pickUpEndTime: modpayload.proposal.pickUpEndTime,
                proposalOtherDate: modpayload.proposal.proposalOtherDate,
                petsInfo: modpayload.proposal.appointmentPet,
                isRecurring: modpayload.proposal.isRecurring,
                recurringStartDate: modpayload.proposal.recurringStartDate,
                recurringSelectedDay: modpayload.proposal.recurringSelectedDay,
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
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

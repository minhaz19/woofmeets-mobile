import {createSlice} from '@reduxjs/toolkit';
// import {format} from 'date-fns';
import {convertToLocalTZ} from '../../../../components/common/formatDate';
// import moment from 'moment-timezone';
// import {formatDate} from '../../../../components/common/formatDate';

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
  billingId: null,
};

const providerProposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    setBillingId: (state, {payload}) => {
      state.billingId = payload;
    },
  },

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
                providerOpk: modpayload?.appointment?.provider?.user?.opk,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                providerName:
                  modpayload.appointment.provider.user?.firstName +
                  ' ' +
                  modpayload.appointment.provider.user?.lastName,
                providerAddress:
                  modpayload.appointment.provider.user?.basicInfo !== null
                    ? modpayload.appointment.provider.user?.basicInfo
                        ?.addressLine1
                    : '',
                userAddress:
                  modpayload.appointment.user?.basicInfo !== null
                    ? modpayload.appointment.user?.basicInfo?.addressLine1
                    : '',
                providerServiceId: modpayload.appointment.providerService.id,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                providerImage: modpayload.appointment.provider.user.image,
                userImage: modpayload.appointment.user.image,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                petsInfo: modpayload.proposal.appointmentPet,
                dropOffStartTime: modpayload.proposal.dropOffStartTime,
                dropOffEndTime: modpayload.proposal.dropOffEndTime,
                pickUpStartTime: modpayload.proposal.pickUpStartTime,
                pickUpEndTime: modpayload.proposal.pickUpEndTime,
                // proposalStartDate: modpayload.proposal.proposalStartDate,
                // proposalEndDate: modpayload.proposal.proposalEndDate,
                proposalStartDate: convertToLocalTZ(
                  modpayload.proposal.proposalStartDate,
                  modpayload.appointment.providerTimeZone,
                ),
                proposalEndDate: convertToLocalTZ(
                  modpayload.proposal.proposalEndDate,
                  modpayload.appointment.providerTimeZone,
                ),
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
                billing: modpayload.appointment.billing,
                rating: modpayload.rating,
                review: modpayload.appointment.review,
                providerTimeZone: modpayload.appointment.providerTimeZone,
                refundDetails: modpayload.proposal.refundDetails,
              }
            : modpayload.appointment.providerService.serviceTypeId === 3 ||
              modpayload.appointment.providerService.serviceTypeId === 5
            ? {
                userId: modpayload.appointment.user.id,
                providerId: modpayload.appointment.provider.id,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                providerOpk: modpayload?.appointment?.provider?.user?.opk,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                providerName:
                  modpayload.appointment.provider.user.firstName +
                  ' ' +
                  modpayload.appointment.provider.user.lastName,
                providerServiceId: modpayload.appointment.providerService.id,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                providerImage: modpayload.appointment.provider.user.image,
                providerAddress:
                  modpayload.appointment.provider.user?.basicInfo !== null
                    ? modpayload.appointment.provider.user?.basicInfo
                        ?.addressLine1
                    : '',
                userAddress:
                  modpayload.appointment.user?.basicInfo !== null
                    ? modpayload.appointment.user?.basicInfo?.addressLine1
                    : '',
                userImage: modpayload.appointment.user.image,
                appointmentserviceType:
                  modpayload.proposal.appointmentserviceType,
                isRecurring: modpayload.proposal.isRecurring,
                length: modpayload.proposal.length,
                recurringStartDate: modpayload.proposal.isRecurring
                  ? convertToLocalTZ(
                      modpayload.proposal.recurringStartDate,
                      modpayload.appointment.providerTimeZone,
                    )
                  : [],
                // recurringStartDate: modpayload.proposal.isRecurring
                //   ? modpayload.proposal.recurringStartDate.split('T')[0]
                //   : [],
                recurringSelectedDay: modpayload.proposal.isRecurring
                  ? modpayload.proposal.proposalVisits
                  : [],
                proposalOtherDate: modpayload.proposal.isRecurring
                  ? []
                  : modpayload.proposal.proposalVisits.map((it: any) => ({
                      date: convertToLocalTZ(
                        it.date,
                        modpayload.appointment.providerTimeZone,
                      ),
                      // name: it?.name,
                      visits: it?.visits?.map((vis: any) => vis.time),
                    })),
                // proposalOtherDate: modpayload.proposal.isRecurring
                //   ? []
                //   : modpayload.proposal.proposalVisits.map((it: any) => ({
                //       date: moment
                //         .tz(it.date, modpayload.appointment.providerTimeZone)
                //         .format('YYYY-MM-DD'),
                //       // name: it?.name,
                //       visits: it?.visits?.map((vis: any) => vis.time),
                //     })),
                // proposalOtherDate: modpayload.proposal.isRecurring
                //   ? []
                //   : modpayload.proposal.proposalVisits,
                petsInfo: modpayload.proposal.appointmentPet,
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
                billing: modpayload.appointment.billing,
                providerTimeZone: modpayload.appointment.providerTimeZone,
                rating: modpayload.rating,
                review: modpayload.appointment.review,
                refundDetails: modpayload.proposal.refundDetails,
              }
            : modpayload.appointment.providerService.serviceTypeId === 4
            ? {
                userId: modpayload.appointment.user.id,
                providerId: modpayload.appointment.provider.id,
                appointmentOpk: modpayload.appointment.opk,
                proposedBy: modpayload.proposal.proposedBy,
                providerOpk: modpayload?.appointment?.provider?.user?.opk,
                serviceName:
                  modpayload.appointment.providerService.serviceType.name,
                serviceTypeId:
                  modpayload.appointment.providerService.serviceTypeId,
                providerName:
                  modpayload.appointment.provider.user.firstName +
                  ' ' +
                  modpayload.appointment.provider.user.lastName,
                providerServiceId: modpayload.appointment.providerService.id,
                userName:
                  modpayload.appointment.user?.firstName +
                  ' ' +
                  modpayload.appointment.user?.lastName,
                providerImage: modpayload.appointment.provider.user.image,
                userImage: modpayload.appointment.user.image,
                providerAddress:
                  modpayload.appointment.provider.user?.basicInfo !== null
                    ? modpayload.appointment.provider.user?.basicInfo
                        ?.addressLine1
                    : '',
                userAddress:
                  modpayload.appointment.user?.basicInfo !== null
                    ? modpayload.appointment.user?.basicInfo?.addressLine1
                    : '',
                dropOffStartTime: modpayload.proposal.dropOffStartTime,
                dropOffEndTime: modpayload.proposal.dropOffEndTime,
                pickUpStartTime: modpayload.proposal.pickUpStartTime,
                pickUpEndTime: modpayload.proposal.pickUpEndTime,
                proposalOtherDate: modpayload.proposal.isRecurring
                  ? []
                  : modpayload.proposal.proposalOtherDate.map((it: any) => ({
                      date: convertToLocalTZ(
                        it?.date,
                        modpayload.appointment.providerTimeZone,
                      ),
                      visits: it?.visits?.map((vis: any) => vis.time),
                    })),
                petsInfo: modpayload.proposal.appointmentPet,
                isRecurring: modpayload.proposal.isRecurring,
                recurringStartDate: convertToLocalTZ(
                  modpayload.proposal.recurringStartDate,
                  modpayload.appointment.providerTimeZone,
                ),
                recurringSelectedDay: modpayload.proposal.recurringSelectedDay,
                firstMessage: modpayload.proposal.firstMessage,
                isRecivedPhotos: modpayload.proposal.isRecivedPhotos,
                appointmentPet: modpayload.proposal.appointmentPet,
                counter: modpayload.proposal.countered,
                status: modpayload.appointment.status,
                formattedMessage: modpayload.proposal.meta.formattedMessage,
                billing: modpayload.appointment.billing,
                rating: modpayload.rating,
                review: modpayload.appointment.review,
                providerTimeZone: modpayload.appointment.providerTimeZone,
                refundDetails: modpayload.proposal.refundDetails,
              }
            : null;
      })
      .addCase(getProviderProposal.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const {setBillingId} = providerProposalSlice.actions;
export default providerProposalSlice.reducer;

/* eslint-disable react-hooks/exhaustive-deps */
import format from 'date-fns/format';
import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';
import methods from '../../../../../../../api/methods';
import {useAppSelector} from '../../../../../../../store/store';
import {useApi} from '../../../../../../../utils/helpers/api/useApi';

const boardingHouseEndpoint =
  '/appointment/boarding-housesitting/get-modified-price';
const dayCareEndpoint = '/appointment/daycare/get-modified-price';
const vistWalkEndpoint = '/appointment/visit-walk/get-modified-price';
export const useProposalPricing = () => {
  const [pricingInfo, setPricingInfo] = useState<any>([]);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  console.log('proposedServiceInfo', proposedServiceInfo);
  const {request: postRequest} = useApi(methods._post);

  const {
    proposalStartDate,
    proposalEndDate,
    petsId,
    multiDate,
    dropOffStartTime,
    dropOffEndTime,
    pickUpStartTime,
    pickUpEndTime,
    visitLength,
    selectedDays,
    recurringStartDate,
    recurringModDates,
    specificModDates,
  } = useWatch();

  useMemo(async () => {
    console.log('is it calling init');
    if (
      proposedServiceInfo.serviceTypeId === 1 ||
      proposedServiceInfo.serviceTypeId === 2
    ) {
      const payload = {
        serviceId: proposedServiceInfo.providerServiceId,
        petIds: petsId,
        proposalStartDate: new Date(proposalStartDate).toISOString(),
        proposalEndDate: new Date(proposalEndDate).toISOString(),
        timing: {
          dropOffStartTime: dropOffStartTime,
          dropOffEndTime: dropOffEndTime,
          pickUpStartTime: pickUpStartTime,
          pickUpEndTime: pickUpEndTime,
        },
        timeZone: 'Asia/Dhaka',
      };
      const result = await postRequest(boardingHouseEndpoint, payload);
      console.log('r', result);
      setPricingInfo([
        ...result.data.petsRates,
        {
          id: result.data.petsRates.length,
          subTotal: result.data.subTotal,
          name: 'subTotal',
        },
      ]);
    } else if (
      proposedServiceInfo.serviceTypeId === 3 ||
      proposedServiceInfo.serviceTypeId === 5
    ) {
      if (proposedServiceInfo.isRecurring) {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          length: visitLength,
          recurringStartDate: format(
            new Date(recurringStartDate),
            "yyyy-MM-dd'T'HH:mm:ss'Z'",
          ),
          isRecurring: true,
          proposalVisits: recurringModDates.map((item: any) => ({
            date: item.date,
            visits: item.visits,
          })),
          timeZone: 'Asia/Dhaka',
        };
        console.log('res', payload);
        // const result = await postRequest(dayCareEndpoint, payload);
        // console.log('res', payload, result);
        // setPricingInfo([
        //   ...result.data.petsRates,
        //   {
        //     id: result.data.petsRates.length,
        //     subTotal: result.data.subTotal,
        //     name: 'subTotal',
        //   },
        // ]);
      } else {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          length: visitLength,
          isRecurring: false,
          timeZone: 'Asia/Dhaka',
          proposalVisits: specificModDates.map((item: any) => ({
            date: item.date,
            visits: item.visits,
          })),
        };
        console.log('res', payload);
        // const result = await postRequest(dayCareEndpoint, payload);
        // console.log('res', payload, result);
        // setPricingInfo([
        //   ...result.data.petsRates,
        //   {
        //     id: result.data.petsRates.length,
        //     subTotal: result.data.subTotal,
        //     name: 'subTotal',
        //   },
        // ]);
      }
    } else if (proposedServiceInfo.serviceTypeId === 4) {
      if (proposedServiceInfo.isRecurring) {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          recurringStartDate: format(
            new Date(proposedServiceInfo.recurringStartDate),
            "yyyy-MM-dd'T'HH:mm:ss'Z'",
          ),
          recurringSelectedDays: selectedDays.map((item: string) =>
            item.substring(0, 3).toLowerCase(),
          ),
          timeZone: 'Asia/Dhaka',
          isRecurring: true,
          timing: {
            dropOffStartTime: dropOffStartTime,
            dropOffEndTime: dropOffEndTime,
            pickUpStartTime: pickUpStartTime,
            pickUpEndTime: pickUpEndTime,
          },
        };
        console.log('res', payload);
        const result = await postRequest(dayCareEndpoint, payload);
        console.log('res', payload, result);
        setPricingInfo([
          ...result.data.petsRates,
          {
            id: result.data.petsRates.length,
            subTotal: result.data.subTotal,
            name: 'subTotal',
          },
        ]);
      } else {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          dates: multiDate,
          timeZone: 'Asia/Dhaka',
          isRecurring: false,
          timing: {
            dropOffStartTime: dropOffStartTime,
            dropOffEndTime: dropOffEndTime,
            pickUpStartTime: pickUpStartTime,
            pickUpEndTime: pickUpEndTime,
          },
        };
        const result = await postRequest(dayCareEndpoint, payload);
        console.log('res', payload, result);
        setPricingInfo([
          ...result.data.petsRates,
          {
            id: result.data.petsRates.length,
            subTotal: result.data.subTotal,
            name: 'subTotal',
          },
        ]);
      }
    }
  }, [
    proposedServiceInfo.providerServiceId,
    petsId,
    proposalStartDate,
    proposalEndDate,
    multiDate,
    dropOffStartTime,
    dropOffEndTime,
    pickUpStartTime,
    selectedDays,
    pickUpEndTime,
    visitLength,

    recurringModDates,
    specificModDates,
  ]);
  return {pricingInfo, proposedServiceInfo};
};

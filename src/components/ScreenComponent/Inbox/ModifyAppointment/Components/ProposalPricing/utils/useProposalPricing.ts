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
      const callApi = (milliseconds: number) => {
        return new Promise(resolve =>
          setTimeout(() => {
            return resolve(postRequest(boardingHouseEndpoint, payload));
          }, milliseconds),
        );
      };
      const result: any = await callApi(750);
      setPricingInfo([
        ...result.data.petsRates,
        {
          id: result.data.petsRates.length,
          subTotal: result.data.subTotal,
          name: 'subTotal',
        },
      ]);
      // const result = await postRequest(boardingHouseEndpoint, payload);
      // setPricingInfo([
      //   ...result.data.petsRates,
      //   {
      //     id: result.data.petsRates.length,
      //     subTotal: result.data.subTotal,
      //     name: 'subTotal',
      //   },
      // ]);
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
          isRecurring: proposedServiceInfo.isRecurring,
          proposalVisits: recurringModDates.map((item: any) => ({
            day: item.date.substring(0, 3).toLowerCase(),
            visits: item.visits,
          })),
          timeZone: 'Asia/Dhaka',
        };
        const result = await postRequest(vistWalkEndpoint, payload);
        setPricingInfo([
          ...result.data.petsRates,
          result?.data?.sixtyMinutesRate
            ? {
                ...result?.data?.sixtyMinutesRate,
                name: result?.data?.sixtyMinutesRate?.rate?.name,
              }
            : null,
          {
            id: result.data.petsRates.length,
            subTotal: result.data.subTotal,
            name: 'subTotal',
            sixtyMinutesRate: result?.data?.sixtyMinutesRate,
          },
        ]);
      } else {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          length: visitLength,
          isRecurring: proposedServiceInfo.isRecurring,
          timeZone: 'Asia/Dhaka',
          proposalVisits: specificModDates.map((item: any) => ({
            date: item.date,
            visits: item.visits,
          })),
        };
        const callApi = (milliseconds: number) => {
          return new Promise(resolve =>
            setTimeout(() => {
              return resolve(postRequest(vistWalkEndpoint, payload));
            }, milliseconds),
          );
        };
        const result: any = await callApi(750);
        setPricingInfo([
          ...result.data.petsRates,
          {
            id: result.data.petsRates.length,
            subTotal: result.data.subTotal,
            name: 'subTotal',
          },
        ]);
        // const result = await postRequest(vistWalkEndpoint, payload);
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
        const result = await postRequest(dayCareEndpoint, payload);
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
        const callApi = (milliseconds: number) => {
          return new Promise(resolve =>
            setTimeout(() => {
              return resolve(postRequest(dayCareEndpoint, payload));
            }, milliseconds),
          );
        };
        const result: any = await callApi(750);
        setPricingInfo([
          ...result.data.petsRates,
          {
            id: result.data.petsRates.length,
            subTotal: result.data.subTotal,
            name: 'subTotal',
          },
        ]);
        // const result = await postRequest(dayCareEndpoint, payload);
        // setPricingInfo([
        //   ...result.data.petsRates,
        //   {
        //     id: result.data.petsRates.length,
        //     subTotal: result.data.subTotal,
        //     name: 'subTotal',
        //   },
        // ]);
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

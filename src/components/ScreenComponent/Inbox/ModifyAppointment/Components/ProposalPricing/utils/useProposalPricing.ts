/* eslint-disable react-hooks/exhaustive-deps */

import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';
import {Alert} from 'react-native';
import methods from '../../../../../../../api/methods';
import {useAppSelector} from '../../../../../../../store/store';
import {useApi} from '../../../../../../../utils/helpers/api/useApi';
import {convertDateAndTime} from '../../../../../../common/convertTimeZone';

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
    providerTimeZone,
  } = useWatch();

  useMemo(async () => {
    if (
      proposedServiceInfo.serviceTypeId === 1 ||
      proposedServiceInfo.serviceTypeId === 2
    ) {
      const payload = {
        serviceId: proposedServiceInfo.providerServiceId,
        petIds: petsId,
        proposalStartDate: convertDateAndTime(
          new Date(proposalStartDate),
          providerTimeZone,
        ),
        proposalEndDate: convertDateAndTime(
          new Date(proposalEndDate),
          providerTimeZone,
        ),
        timing: {
          dropOffStartTime: dropOffStartTime,
          dropOffEndTime: dropOffEndTime,
          pickUpStartTime: pickUpStartTime,
          pickUpEndTime: pickUpEndTime,
        },
        timeZone: providerTimeZone,
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
    } else if (
      proposedServiceInfo.serviceTypeId === 3 ||
      proposedServiceInfo.serviceTypeId === 5
    ) {
      if (proposedServiceInfo.isRecurring) {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          length: visitLength,
          recurringStartDate: convertDateAndTime(
            new Date(recurringStartDate),
            providerTimeZone,
          ),
          isRecurring: proposedServiceInfo.isRecurring,
          proposalVisits: recurringModDates.map((item: any) => ({
            day: item.date.substring(0, 3).toLowerCase(),
            visits: item.visits,
          })),
          timeZone: providerTimeZone,
        };

        const result = await postRequest(vistWalkEndpoint, payload);
        if (result.ok) {
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
          Alert.alert(result.data.message);
        }
      } else {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          length: visitLength,
          isRecurring: proposedServiceInfo.isRecurring,
          timeZone: providerTimeZone,
          proposalVisits: specificModDates.map((item: any) => ({
            date: convertDateAndTime(new Date(item.date), providerTimeZone),
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
      }
    } else if (proposedServiceInfo.serviceTypeId === 4) {
      if (proposedServiceInfo.isRecurring) {
        const payload = {
          serviceId: proposedServiceInfo.providerServiceId,
          petIds: petsId,
          recurringStartDate: convertDateAndTime(
            new Date(proposedServiceInfo.recurringStartDate),
            providerTimeZone,
          ),
          recurringSelectedDays: selectedDays.map((item: string) =>
            item.substring(0, 3).toLowerCase(),
          ),
          timeZone: providerTimeZone,
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
          dates: multiDate.map((item: string) =>
            convertDateAndTime(new Date(item), providerTimeZone),
          ),
          timeZone: providerTimeZone,
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

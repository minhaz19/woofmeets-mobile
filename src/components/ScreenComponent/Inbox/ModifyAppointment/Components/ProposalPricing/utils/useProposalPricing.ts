/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo, useState} from 'react';
import {useWatch} from 'react-hook-form';
import methods from '../../../../../../../api/methods';
import {useAppSelector} from '../../../../../../../store/store';
import {useApi} from '../../../../../../../utils/helpers/api/useApi';

const boardingHouseEndpoint =
  '/appointment/getModifiedBoardingHouseSittingPrice';
const dayCareEndpoint = '/appointment/getModifiedDayCarePrice';
export const useProposalPricing = () => {
  const [pricingInfo, setPricingInfo] = useState<any>([]);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  console.log('proposedServiceInfo', proposedServiceInfo);
  const {request: postRequest} = useApi(methods._post);

  const {proposalStartDate, proposalEndDate, petsId, multiDate} = useWatch();

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
    } else if (proposedServiceInfo.serviceTypeId === 4) {
      console.log('multiDate', multiDate);
      const payload = {
        serviceId: proposedServiceInfo.providerServiceId,
        petIds: petsId,
        dates: multiDate,
        timeZone: 'Asia/Dhaka',
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
  }, [
    proposedServiceInfo.providerServiceId,
    petsId,
    proposalStartDate,
    proposalEndDate,
    multiDate,
  ]);
  return {pricingInfo, proposedServiceInfo};
};

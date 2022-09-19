/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import methods from '../../../../../api/methods';
import {setBoardingSelection} from '../../../../../store/slices/onBoarding/initial';
import {getAvailability} from '../../../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import {getServiceRateFields} from '../../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import {getRateFieldValue} from '../../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const ratePostEndpoint = '/service-rates/multiple/create';
const ratePutEndpoint = '/service-rates/multiple/update';
export const useServiceRates = (serviceSetup: any, providerServiceId: any) => {
  const {serviceId, providerServicesId} = serviceSetup?.routeData;
  const dispatch = useAppDispatch();
  const {loading, serviceRateFields} = useAppSelector(
    state => state.serviceRates,
  );
  const {availability} = useAppSelector(state => state?.availability);
  const {loading: fLoading, fieldValue} = useAppSelector(
    state => state.fieldValue,
  );
  const addRateApi = (data: any) => {
    return fieldValue === null
      ? methods._post(ratePostEndpoint, data)
      : methods._put(ratePutEndpoint, data);
  };
  const {loading: btnLoading, request} = useApi(addRateApi);
  const rateFieldId = serviceRateFields?.map(
    (item: {slug: string; id: number}) => {
      return {
        name: item.slug.replace('-', ''),
        postId: item.id,
      };
    },
  );
  rateFieldId &&
    fieldValue &&
    fieldValue.map(
      (item: {id: number}, index: number) =>
        (rateFieldId[index].putId = item.id),
    );
  const handleRates = async (e: any) => {
    let payload: any = {
      serviceRate: [],
    };
    rateFieldId &&
      rateFieldId.forEach(
        (element: {postId: number; name: string; putId: number}) => {
          Object.keys(e).map(item => {
            if (item === element.name) {
              payload.serviceRate.push({
                serviceId: providerServicesId,
                rateId: fieldValue === null ? element.postId : element.putId,
                amount: e[element.name],
              });
            }
          });
        },
      );
    const result = await request(payload);
    if (result) {
      dispatch(setBoardingSelection({pass: 0}));
      dispatch(getRateFieldValue(providerServicesId));
    }
  };
  useEffect(() => {
    dispatch(getServiceRateFields(serviceId));
    dispatch(getRateFieldValue(providerServicesId));
    availability === null && dispatch(getAvailability(providerServiceId[0]));
  }, []);
  return {
    handleRates,
    loading,
    fLoading,
    btnLoading,
    serviceRateFields,
  };
};

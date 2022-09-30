/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import methods from '../../../../../api/methods';
import {setBoardingSelection} from '../../../../../store/slices/onBoarding/initial';
import {getServiceRateFields} from '../../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import {getRateFieldValue} from '../../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const ratePostEndpoint = '/service-rates/multiple/create';
const ratePutEndpoint = '/service-rates/multiple/update';
export const useServiceRates = (serviceSetup: any) => {
  const {serviceId, providerServicesId} = serviceSetup?.routeData;
  const dispatch = useAppDispatch();
  const {loading, serviceRateFields} = useAppSelector(
    state => state.serviceRates,
  );
  const {loading: fLoading, fieldValue} = useAppSelector(
    state => state.fieldValue,
  );
  const addRateApi = (data: any) => {
    return fieldValue === null || fieldValue === undefined
      ? methods._post(ratePostEndpoint, data)
      : methods._put(ratePutEndpoint, data);
  };
  const {loading: btnLoading, request} = useApi(addRateApi);
  const rateFieldId = serviceRateFields?.map(
    (item: {slug: string; id: number}) => {
      return {
        name: item.slug.replace('-', '').replace('-', ''),
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
  console.log('rate field id', fieldValue, serviceRateFields);
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
                rateId:
                  fieldValue === null || fieldValue === undefined
                    ? element.postId
                    : element.putId,
                amount: e[element.name],
              });
            }
          });
        },
      );
    console.log('e', e, 'rate', rateFieldId, 'pay', payload);
    const result = await request(payload);
    console.log('result ,', result);
    if (result.ok) {
      dispatch(setBoardingSelection({pass: 0}));
      dispatch(getRateFieldValue(providerServicesId));
    }
  };
  useEffect(() => {
    dispatch(getServiceRateFields(serviceId));
    dispatch(getRateFieldValue(providerServicesId));
  }, []);
  return {
    handleRates,
    loading,
    fLoading,
    btnLoading,
    serviceRateFields,
  };
};

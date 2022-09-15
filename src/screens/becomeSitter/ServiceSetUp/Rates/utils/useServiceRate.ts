/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import methods from '../../../../../api/methods';
import {getServiceRateFields} from '../../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import {getRateFieldValue} from '../../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const ratePostEndpoint = '/service-rates/multiple/create';
const ratePutEndpoint = '/service-rates/muptiple/update';
export const useServiceRates = (route: any, navigation: any) => {
  const {serviceId, providerServicesId} = route.params;
  const dispatch = useAppDispatch();
  const {loading, serviceRateFields} = useAppSelector(
    state => state.serviceRates,
  );
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
    console.log('r', payload);
    // const result = await request(payload);
    // if (result) {
    //   navigation.goBack();
    //   dispatch(getRateFieldValue(providerServicesId));
    // }
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

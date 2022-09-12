/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../../api/methods';
import {getServiceRateFields} from '../../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import {getRateFieldValue} from '../../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';
interface HandleProps {
  baserate: string;
  additionaldog: string;
  catcare: string;
  holidayrate: string;
}
const ratePostEndpoint = '/service-rates';
const ratePutEndpoint = '/service-rates/';
export const useServiceRates = (route: any) => {
  const {serviceId, providerServicesId} = route.params;
  const dispatch = useAppDispatch();
  const {loading, serviceRateFields} = useAppSelector(
    state => state.serviceRates,
  );
  const {loading: fLoading, fieldValue} = useAppSelector(
    state => state.fieldValue,
  );
  const addRateApi = (data: any, serviceRateId: string) => {
    // return fieldValue === null
    //   ? methods._post(ratePostEndpoint, data)
    //   : methods._put(`${ratePutEndpoint + serviceRateId}`, data.amount);
  };
  const {loading: btnLoading, request} = useApi(addRateApi);
  const rateFieldId = serviceRateFields?.map(
    (item: {slug: string; id: number}) => {
      return {
        name: item.slug.replace('-', ''),
        id: item.id,
      };
    },
  );

  const handleRates = async (e: any) => {
    rateFieldId &&
      rateFieldId.forEach((element: {id: number; name: string}) => {
        Object.keys(e).map(async item => {
          if (item === element.name) {
            const payload = {
              serviceId: providerServicesId,
              rateId: element.id,
              amount: e[element.name],
            };
            // const result = await request(payload, element.id);
          }
        });
      });
    return Alert.alert('Submission not supported yet...!');
  };
  useEffect(() => {
    serviceRateFields === null && dispatch(getServiceRateFields(serviceId));
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

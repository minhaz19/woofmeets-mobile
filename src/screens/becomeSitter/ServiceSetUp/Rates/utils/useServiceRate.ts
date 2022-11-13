import methods from '../../../../../api/methods';
import {setBoardingSelection} from '../../../../../store/slices/onBoarding/initial';
import {getRateFieldValue} from '../../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const ratePostEndpoint = '/service-rates/multiple/create';
const ratePutEndpoint = '/service-rates/multiple/update';
export const useServiceRates = (
  serviceSetup: any,
  navigation: any,
  route: any,
) => {
  const {providerServicesId} = serviceSetup?.routeData;
  const dispatch = useAppDispatch();
  const {loading, serviceRateFields, ratesMeta} = useAppSelector(
    state => state.serviceRates,
  );
  const {loading: fLoading, fieldValue} = useAppSelector(
    state => state.fieldValue,
  );
  const addRateApi = (data: any) => {
    return fieldValue === null || fieldValue === undefined
      ? methods._post(ratePostEndpoint, data)
      : methods._put(ratePutEndpoint, {
          ratesToUpdate: data.serviceRate,
          ratesToAdd: [],
        });
  };
  const {loading: btnLoading, request} = useApi(addRateApi);
  const rateFieldId = serviceRateFields?.map(
    (item: {slug: string; rateId: number; id: number}) => {
      return {
        name: item.slug.replace('-', '').replace('-', ''),
        postId: item.rateId,
        rateTypeId: item.id,
        putId: null,
      };
    },
  );
  rateFieldId &&
    rateFieldId !== undefined &&
    fieldValue &&
    fieldValue?.map((item: {id: number; modRatesId: number}) => {
      const fIndex = rateFieldId.findIndex(
        (elm: any) => elm.rateTypeId === item.modRatesId,
      );
      if (fIndex !== -1) {
        return (rateFieldId[fIndex].putId = item.id);
      }
    });
  const handleRates = async (e: any) => {
    let payload: any = {
      serviceRate: [],
    };
    rateFieldId &&
      rateFieldId.length !== 0 &&
      rateFieldId?.forEach(
        (element: {postId: number; name: string; putId: number}) => {
          Object.keys(e).map(item => {
            if (item === element.name) {
              payload.serviceRate.push({
                serviceId: providerServicesId,
                rateId:
                  fieldValue === null || fieldValue === undefined
                    ? element.postId
                    : element.putId,
                amount: Number(e[element.name]),
              });
            }
          });
        },
      );
    const result = await request(payload);
    if (result.ok) {
      dispatch(setBoardingSelection({pass: 0}));
      dispatch(getRateFieldValue(providerServicesId));
      if (route.name === 'RatesScreen') {
        navigation.goBack();
      }
    }
  };
  return {
    handleRates,
    loading,
    fLoading,
    btnLoading,
    serviceRateFields,
    fieldValue,
    ratesMeta,
  };
};

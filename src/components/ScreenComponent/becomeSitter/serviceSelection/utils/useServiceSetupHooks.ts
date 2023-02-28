import {CancelToken} from 'apisauce';
import {useCallback, useEffect, useState} from 'react';
import methods from '../../../../../api/methods';
import {setIsSelectedSection} from '../../../../../store/slices/onBoarding/initialSetUp/serviceSetupFlowSlice';
import {getNewOnboarding} from '../../../../../store/slices/onBoarding/newOnboardingApi/newOnboardingAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const onboardingPostEndPoint = '/onboarding';
const onboardingPutEndPoint = '/onboarding';
const getCancellationPolicyEndPoint = '/cancellation-policy';
const getAttributesEndpoint = '/provider-home/attributue-title-types';

export const useServiceSetupHooks = (serviceSetup: any, route: { params: any; }, navigation: { goBack: any; }) => {
  const [serviceRateFields, setServiceRateFields] = useState([]);
  const [ratesMeta, setRatesMeta] = useState(null);
  const [policy, setPolicy] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useAppDispatch();
  const {availability, fieldValue, onboardingLoading} = useAppSelector(
    state => state.newOnboarding,
  );
  const providerServiceId = serviceSetup?.id;

  const {loading: getRatesFieldRatesLoading, request: getRatesFieldRates} =
    useApi(methods._get);

  const {
    loading: getCancellationPolicyLoading,
    request: getCancellationPolicy,
  } = useApi(methods._get);
  const {request: getAttributesRequest, loading: getAttributesLoading} = useApi(
    methods._get,
  );

  //   getting service rates and type by id
  const getServiceRateAndTypeById = async (id: number) => {
    const getServiceTypesRatesEndPoint = `/service-rates/type-has-rate/${id}`;
    const result = await getRatesFieldRates(getServiceTypesRatesEndPoint);
    if (result?.ok) {
      const findIndex = result?.data?.data?.findIndex(
        (item: any) => item.serviceRateType.slug === 'base-rate',
      );
      result?.data?.data?.splice(
        0,
        0,
        result?.data?.data?.splice(findIndex, 1)[0],
      );
      setRatesMeta(
        result?.data?.data?.filter(
          (item: any) => item.serviceRateType.slug === 'base-rate',
        )[0].ServiceType.meta,
      );
      setServiceRateFields(
        result?.data?.data?.map((item: any) => ({
          ...item.serviceRateType,
          rateId: item.id,
          rateUnitLabel: item.ServiceType.unitlabel,
          percentage: result?.data?.data?.filter(
            (it: any) => it.serviceRateType.slug === 'base-rate',
          )[0].ServiceType.meta[`${item.serviceRateType.slug}`],
        })),
      );
    }
  };

  // get cancellation policy data
  const getCancellationPolicyData = async () => {
    const result = await getCancellationPolicy(getCancellationPolicyEndPoint);
    if (result?.ok) {
      setPolicy(result?.data?.data);
    }
  };

  // get Attributes data
  const handleGetAttributes = async () => {
    const result = await getAttributesRequest(getAttributesEndpoint);
    if (result?.ok) {
      setAttributes(result?.data?.data);
    }
  };

  useEffect(() => {
    const source = CancelToken.source();
    getServiceRateAndTypeById(serviceSetup?.serviceTypeId);
    getCancellationPolicyData();
    handleGetAttributes();
    return () => {
      source.cancel();
    };
  }, []);

  // for put/post request
  const addRateApi = (data: any) => {
    return fieldValue === null || fieldValue === undefined
      ? methods._post(onboardingPostEndPoint, data)
      : methods._put(onboardingPutEndPoint, data);
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

  // sending data to back end by put/post
  const handleOnBoard = async (e: any) => {
    let ratesPayload: any = {
      serviceRate: [],
    };
    let ratesPutPayload: any = {
      ratesToUpdate: [],
      ratesToAdd: [],
    };
    rateFieldId &&
      rateFieldId.length !== 0 &&
      rateFieldId?.forEach(
        (element: {
          name: string;
          postId: number;
          rateTypeId: number;
          putId: number | null;
        }) => {
          Object.keys(e).map(item => {
            if (item === element.name) {
              if (fieldValue === null || fieldValue === undefined) {
                ratesPayload.serviceRate.push({
                  serviceId: providerServiceId,
                  rateId:
                    fieldValue === null || fieldValue === undefined
                      ? element.postId
                      : element.putId,
                  amount: Number(e[element.name]),
                });
              } else {
                if (element.putId === null) {
                  ratesPutPayload.ratesToAdd.push({
                    serviceId: providerServiceId,
                    rateId: element.postId,
                    amount: Number(e[element.name]),
                  });
                } else {
                  ratesPutPayload.ratesToUpdate.push({
                    serviceId: providerServiceId,
                    rateId: element.putId,
                    amount: Number(e[element.name]),
                  });
                }
                ratesPayload = ratesPutPayload;
              }
            }
          });
        },
      );
    const postPayload = {
      multipleServiceRate: ratesPayload,
      providerServiceId: providerServiceId,
      availability: {
        providerServiceId: providerServiceId,
        sat: e?.selectDay?.sat,
        sun: e?.selectDay?.sun,
        mon: e?.selectDay?.mon,
        tue: e?.selectDay?.tue,
        wed: e?.selectDay?.wed,
        thu: e?.selectDay?.thu,
        fri: e?.selectDay?.fri,
        pottyBreak: e?.pottyBreak,
      },
      cancellationPolicyId: +e?.cancellationPolicy,
      providerHome: {
        homeType: e?.homeType,
        yardType: e?.yardType,
        homeAttributes: e?.homeAttributes,
      },
      petPreferance: {
        petPerDay: e?.petPerDay,
        smallDog: e?.preference?.smallDog,
        mediumDog: e?.preference?.mediumDog,
        largeDog: e?.preference?.largeDog,
        giantDog: e?.preference?.giantDog,
        cat: e?.preference?.cat,
      },
    };
    const putPayload = {
      multipleServiceRate: ratesPayload,
      availabilityId: availability?.id,
      availability: {
        sat: e?.selectDay?.sat,
        sun: e?.selectDay?.sun,
        mon: e?.selectDay?.mon,
        tue: e?.selectDay?.tue,
        wed: e?.selectDay?.wed,
        thu: e?.selectDay?.thu,
        fri: e?.selectDay?.fri,
        pottyBreak: e?.pottyBreak,
      },
      cancellationPolicyId: +e?.cancellationPolicy,
      providerHome: {
        homeType: e?.homeType,
        yardType: e?.yardType,
        homeAttributes: e?.homeAttributes,
      },
      petPreferance: {
        petPerDay: e?.petPerDay,
        smallDog: e?.preference?.smallDog,
        mediumDog: e?.preference?.mediumDog,
        largeDog: e?.preference?.largeDog,
        giantDog: e?.preference?.giantDog,
        cat: e?.preference?.cat,
      },
      providerServiceId: providerServiceId,
    };
    const result = await request(
      fieldValue === null || fieldValue === undefined
        ? postPayload
        : putPayload,
    );
    if (result.ok) {
      dispatch(getNewOnboarding(serviceSetup?.id));
      route?.params?.goBack
        ? navigation.goBack()
        : dispatch(setIsSelectedSection('profileSetup'));
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getNewOnboarding(serviceSetup?.id));
    setRefreshing(false);
  }, []);

  return {
    handleOnBoard,
    getRatesFieldRatesLoading,
    btnLoading,
    serviceRateFields,
    fieldValue,
    ratesMeta,
    onboardingLoading,
    refreshing,
    onRefresh,
    policy,
    getCancellationPolicyLoading,
    getAttributesLoading,
    attributes,
  };
};

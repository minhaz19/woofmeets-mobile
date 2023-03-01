import {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../../../api/methods';
import {setIsSelectedSection} from '../../../../../../store/slices/onBoarding/initialSetUp/serviceSetupFlowSlice';
import {getNewOnboarding} from '../../../../../../store/slices/onBoarding/newOnboardingApi/newOnboardingAction';
import {getContactInfo} from '../../../../../../store/slices/profile/contact';
import {useAppDispatch, useAppSelector} from '../../../../../../store/store';
import {useApi} from '../../../../../../utils/helpers/api/useApi';
import {baseUrlV} from '../../../../../../utils/helpers/httpRequest';

const url = '/onboarding';
export const useProfileSetup = () => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const redDispatch = useAppDispatch();
  const {request: postRequest, loading: postLoading} = useApi(methods._post);
  const {request: putRequest, loading: putLoading} = useApi(methods._put);
  const {serviceSetup} = useAppSelector(statee => statee.serviceSetup);
  const {basicInfo, onboardingLoading} = useAppSelector(
    statee => statee.newOnboarding,
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getNewOnboarding(serviceSetup?.id));
    await dispatch(getContactInfo());
    setRefreshing(false);
  }, []);
  const {request: locationRequest, loading: locationLoading} = useApi(
    methods._get,
  );
  const handleSubmit = async (data: any) => {
    const {
      dob,
      addressLine1,
      addressLine2,
      street,
      city,
      state: addressState,
      zipCode,
      countryId,
      latitude,
      longitude,
      headline,
      yearsOfExperience,
      experienceDescription,
      skills,
      emergencyContactName,
      emergencyPhone,
    } = data;
    let payload = {};
    if (latitude && longitude) {
      payload = {
        basicInfo: {
          dob,
          addressLine1,
          addressLine2,
          street,
          city,
          state: addressState,
          zipCode,
          countryId,
          latitude,
          longitude,
        },
        emergencyContact: {
          name: emergencyContactName,
          // email: 'string',
          phone: emergencyPhone,
        },
        providerDetails: {
          headline,
          yearsOfExperience: Number(yearsOfExperience),
          experienceDescription,
          skills,
          // about: 'string',
        },
        providerServiceId: serviceSetup?.id,
      };
    } else {
      const locationAddressEndPoint = `${baseUrlV}/v2/location?address=${addressLine1}`;
      const result = await locationRequest(locationAddressEndPoint);
      if (result?.ok) {
        const country = result?.data?.results[0]?.address_components.find(
          (addressComponent: any) => addressComponent.types.includes('country'),
        )?.short_name;
        payload = {
          basicInfo: {
            addressLine1: addressLine1,
            city: city
              ? city
              : result?.data?.results[0]?.address_components.find(
                  (addressComponent: any) =>
                    addressComponent.types.includes('locality'),
                )?.short_name,
            state: addressState
              ? addressState
              : result?.data?.results[0]?.address_components.find(
                  (addressComponent: any) =>
                    addressComponent.types.includes(
                      'administrative_area_level_1',
                    ),
                )?.long_name,
            zipCode: zipCode
              ? zipCode
              : result?.data?.results[0]?.address_components.find(
                  (addressComponent: any) =>
                    addressComponent.types.includes('postal_code'),
                )?.short_name,
            countryId: countryId
              ? Number(countryId)
              : country === 'US'
              ? 1
              : country === 'CA'
              ? 2
              : null,
            dob: dob,
            latitude: result?.data?.results[0]?.geometry?.location.lat,
            longitude: result?.data?.results[0]?.geometry?.location.lng,
          },
          emergencyContact: {
            name: emergencyContactName,
            // email: 'string',
            phone: emergencyPhone,
          },
          providerDetails: {
            headline,
            yearsOfExperience: Number(yearsOfExperience),
            experienceDescription,
            skills,
            // about: 'string',
          },
          providerServiceId: serviceSetup?.id,
        };
      }
    }

    if (payload?.basicInfo?.latitude && payload?.basicInfo?.longitude) {
      const result =
        basicInfo === null
          ? await postRequest(url, payload)
          : await putRequest(url, payload);
      if (result.ok) {
        redDispatch(getNewOnboarding(serviceSetup?.id));
        redDispatch(setIsSelectedSection('submitProfile'));
      } else {
        Alert.alert(result?.data?.message);
      }
    } else {
      Alert.alert(
        'Location',
        'Please select your specific address from dropdown',
      );
    }
  };
  return {
    refreshing,
    dispatch,
    onRefresh,
    handleSubmit,
    putLoading,
    postLoading,
    onboardingLoading,
    locationLoading,
  };
};

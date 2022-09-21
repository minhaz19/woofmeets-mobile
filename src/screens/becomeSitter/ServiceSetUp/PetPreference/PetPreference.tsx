import {ScrollView, StyleSheet} from 'react-native';
import React, {memo, useEffect} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import methods from '../../../../api/methods';
import {useApi} from '../../../../utils/helpers/api/useApi';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import SubPetPreference from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubPetPreference/SubPetPreference';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {setPetPreference} from '../../../../store/slices/onBoarding/setUpService/petPreference/PetPreferenceSlice';
import {setBoardingSelection} from '../../../../store/slices/onBoarding/initial';
import {getYourHome} from '../../../../store/slices/onBoarding/setUpService/yourHome/getYourHome';
import { getPetPreference } from '../../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';

const endPoint = '/pet-preference';

const PetPreference = () => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {loading, petPreference, petPerDay} = useAppSelector(
    (state: any) => state?.petPreference,
  );

  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {itemId, name, image, description} = serviceSetup.routeData;

  const {request: putRequest, loading: putLoading} = useApi(methods._put);
  const handlePetPreference = async (e: any) => {
    const formattedData = {
      petPerDay: e.petPerDay,
      smallDog: e.smallDog,
      mediumDog: e.mediumDog,
      largeDog: e.largeDog,
      giantDog: e.giantDog,
      cat: e.cat,
    };
    const result = await putRequest(endPoint, formattedData);
    if (result?.data?.data) {
      dispatch(setPetPreference(result?.data?.data));
      dispatch(setBoardingSelection({pass: 2}));
    }
  };
  useEffect(() => {
    dispatch(getPetPreference());
  }, [dispatch]);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <SubPetPreference
          handlePetPreference={handlePetPreference}
          putLoading={putLoading}
          petPreference={petPreference}
          petPerDay={petPerDay}
        />
      </ScrollView>
    </>
  );
};

export default memo(PetPreference);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

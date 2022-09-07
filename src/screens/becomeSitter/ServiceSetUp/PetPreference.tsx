/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../components/common/Form/AppForm';
import methods from '../../../api/methods';
import {useApi} from '../../../utils/helpers/api/useApi';
import AppActivityIndicator from '../../../components/Loaders/AppActivityIndicator';
import {useAppDispatch, useAppSelector} from '../../../store/store';
// import {usePetPreferenceInitialData} from './useServiceSetUpInitialState';
import {getPetPreference} from '../../../store/slices/setUpService/petPreference/getPetPreference';
import SubPetPreference from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubPetPreference/SubPetPreference';
import { petPreferenceSchema } from './useServiceSetUpInitialState';
const endPoint = '/pet-preference';

const PetPreference = (props: {
  navigation: {navigate: (arg0: string) => void};
  route: {params: {serviceData: any[]}};
}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {loading, petPreference} = useAppSelector(
    (state: any) => state?.petPreference,
  );
  useEffect(() => {
    petPreference === null && dispatch(getPetPreference());
  }, [petPreference, dispatch]);

  const {request: putRequest, loading: putLoading} = useApi(methods._put);
  const handlePetPreference = async (e: any) => {
    const result = await putRequest(endPoint, e);
    if (result) {
      props.navigation.navigate('YourHome');
    }
  };

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ReusableHeader />
        <AppForm
          initialValues={{
            smallDog: petPreference?.smallDog ? petPreference.smallDog : false,
            mediumDog: petPreference?.mediumDog
              ? petPreference.mediumDog
              : false,
            largeDog: petPreference?.largeDog ? petPreference.largeDog : false,
            giantDog: petPreference?.giantDog ? petPreference.giantDog : false,
            cat: petPreference?.cat ? petPreference.cat : false,
          }}
          validationSchema={petPreferenceSchema}>
          <SubPetPreference
            handlePetPreference={handlePetPreference}
            putLoading={putLoading}
          />
        </AppForm>
      </ScrollView>
    </>
  );
};

export default PetPreference;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

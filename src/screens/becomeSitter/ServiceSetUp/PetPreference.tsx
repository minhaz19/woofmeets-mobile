import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import methods from '../../../api/methods';
import {useApi} from '../../../utils/helpers/api/useApi';
import {useAppDispatch, useAppSelector} from '../../../store/store';
// import {usePetPreferenceInitialData} from './useServiceSetUpInitialState';
import {getPetPreference} from '../../../store/slices/onBoarding/setUpService/petPreference/getPetPreference';
import SubPetPreference from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubPetPreference/SubPetPreference';
// import {petPreferenceSchema} from './useServiceSetUpInitialState';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
// import SmallAppForm from '../../../components/common/Form/SmallAppForm';
const endPoint = '/pet-preference';

const PetPreference = (props: {
  navigation: {navigate: (arg0: string, arg1: any) => void};
  route: {params: any};
}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const {loading, petPreference, petPerDay} = useAppSelector(
    (state: any) => state?.petPreference,
  );
  const {itemId, name, image, description} = props?.route?.params;
  useEffect(() => {
    petPreference === null && dispatch(getPetPreference());
  }, [petPreference, dispatch]);

  const {request: putRequest, loading: putLoading} = useApi(methods._put);
  const handlePetPreference = async (e: any) => {
    const result = await putRequest(endPoint, e);
    if (result) {
      props.navigation.navigate('YourHome', {
        itemId: itemId,
        name: name,
        image: image,
        description: description,
      });
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
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        {/* <SmallAppForm
          initialValues={usePetPreferenceInitialData()}
          validationSchema={petPreferenceSchema}> */}
        <SubPetPreference
          handlePetPreference={handlePetPreference}
          putLoading={putLoading}
          petPreference={petPreference}
          petPerDay={petPerDay}
        />
        {/* </SmallAppForm> */}
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

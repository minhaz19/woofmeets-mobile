import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
// import AppActivityIndicator from '../../../components/Loaders/AppActivityIndicator';
import AppForm from '../../../components/common/Form/AppForm';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const YourHome = (props: {
  navigation: {navigate: (arg0: string, arg1: any) => void};
  route: {params: any};
}) => {
  const {colors} = useTheme();
  const {itemId, name, image, description} = props?.route?.params;
  const YouHomeSchema = Yup.object()
    .shape({
      // smallDog: Yup.boolean(),
      // mediumDog: Yup.boolean(),
      // largeDog: Yup.boolean(),
      // giantDog: Yup.boolean(),
      // cat: Yup.boolean(),
    })
    .required('select at least one');
  return (
    <>
      {/* {loading && <AppActivityIndicator visible={true} />} */}
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
        <AppForm initialValues={{}} validationSchema={YouHomeSchema}>
          {/* <SubPetPreference
          handlePetPreference={handlePetPreference}
          putLoading={putLoading}
        /> */}
        </AppForm>
      </ScrollView>
    </>
  );
};

export default YourHome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

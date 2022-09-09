import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../components/common/Form/AppForm';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const YourHome = () => {
  const {colors} = useTheme();
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
        <ReusableHeader />
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

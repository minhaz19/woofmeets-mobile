import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
// import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import SubAvailability from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubAvailabilty/SubAvailability';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppForm from '../../../../components/common/Form/AppForm';
import {useAvailabilityUtils} from './utils/useAvailabilityUtils';
import {
  AvailabilityInitialValues,
  availabilityValidation,
} from './utils/AvailabilityInitialValues';

const Availability = (props: {
  navigation: {navigate: (arg0: string, arg1: any) => void};
  route: {params: any};
}) => {
  const {colors} = useTheme();
  const {itemId, name, image, description} = props?.route?.params;

  const {handlePost, PLoading} = useAvailabilityUtils(itemId, props.navigation);

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
        <AppForm
          initialValues={AvailabilityInitialValues(itemId)}
          validationSchema={availabilityValidation}>
          <SubAvailability handlePost={handlePost} loading={PLoading} />
        </AppForm>
      </ScrollView>
    </>
  );
};

export default Availability;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

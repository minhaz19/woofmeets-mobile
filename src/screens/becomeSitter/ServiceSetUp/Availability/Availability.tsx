import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import SubAvailability from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubAvailabilty/SubAvailability';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppForm from '../../../../components/common/Form/AppForm';
import {useAvailabilityUtils} from './utils/useAvailabilityUtils';
import {
  AvailabilityInitialValues,
  availabilityValidation,
} from './utils/AvailabilityInitialValues';
import {useAppSelector} from '../../../../store/store';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import ScrollViewRapper from '../../../../components/common/ScrollViewRapper';

const Availability = () => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {itemId, name, image, description, service} = serviceSetup.routeData;
  const serviceId = service.map((data: {id: any}) => data.id);

  const {availability, loading} = useAppSelector(
    (state: any) => state?.availability,
  );
  // hook for post/put
  const {handlePost, isLoading} = useAvailabilityUtils(serviceId[0]);
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollViewRapper
        style={
          styles.rootContainer
        }>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <AppForm
          initialValues={AvailabilityInitialValues(
            serviceId[0],
            availability,
            itemId,
          )}
          validationSchema={availabilityValidation}
          enableReset>
          <SubAvailability handlePost={handlePost} loading={isLoading} />
        </AppForm>
      </ScrollViewRapper>
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

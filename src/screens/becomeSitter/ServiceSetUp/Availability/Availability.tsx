import {RefreshControl, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import SubAvailability from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubAvailabilty/SubAvailability';
import AppForm from '../../../../components/common/Form/AppForm';
import {useAvailabilityUtils} from './utils/useAvailabilityUtils';
import {
  AvailabilityInitialValues,
  availabilityValidation,
} from './utils/AvailabilityInitialValues';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import ScrollViewRapper from '../../../../components/common/ScrollViewRapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAvailability } from '../../../../store/slices/onBoarding/setUpService/availability/getAvailability';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const Availability = () => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {itemId, name, image, description, service} = serviceSetup.routeData;
  const providerServiceId = service.map((data: {providerServiceId: any}) => data.providerServiceId);

  const {availability, loading} = useAppSelector(
    (state: any) => state?.availability,
  );
  // hook for post/put
  const {handlePost, isLoading} = useAvailabilityUtils(providerServiceId[0]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getAvailability(providerServiceId[0]));
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  
  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <KeyboardAwareScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}
      extraHeight={100}
      extraScrollHeight={200}
      enableAutomaticScroll={true}
      enableOnAndroid={true}>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <AppForm
          initialValues={AvailabilityInitialValues(
            providerServiceId[0],
            availability,
            itemId,
          )}
          validationSchema={availabilityValidation}
          enableReset>
          <SubAvailability handlePost={handlePost} loading={isLoading} />
        </AppForm>
      </KeyboardAwareScrollView>
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

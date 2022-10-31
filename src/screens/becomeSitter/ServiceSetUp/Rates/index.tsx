import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../../components/common/Form/AppForm';
import SubRates from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubRates';
import {BoardingSettingsSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useServiceRateInit} from './utils/useServiceRateInit';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useServiceRates} from './utils/useServiceRate';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getServiceRateFields } from '../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import { getRateFieldValue } from '../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const Rates = () => {
  const {serviceSetup} = useAppSelector((state: { serviceSetup: any; }) => state?.serviceSetup);
  const {itemId, name, image, description, serviceId, providerServicesId} = serviceSetup.routeData;
  const {colors} = useTheme()
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {
    handleRates,
    loading,
    btnLoading,
    fLoading,
    serviceRateFields,
  } = useServiceRates(serviceSetup);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(getServiceRateFields(serviceId));
    dispatch(getRateFieldValue(providerServicesId));
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      {(loading || fLoading) && <AppActivityIndicator visible={true} />}
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
          initialValues={useServiceRateInit()}
          validationSchema={BoardingSettingsSchema}
          enableReset>
          <SubRates
            handleRates={handleRates}
            rateFields={serviceRateFields}
            loading={btnLoading}
          />
        </AppForm>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Rates;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

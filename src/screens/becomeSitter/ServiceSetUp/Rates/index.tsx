/* eslint-disable react-hooks/exhaustive-deps */
import {RefreshControl, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../../components/common/Form/AppForm';
import SubRates from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubRates';
import {BoardingSettingsSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useServiceRateInit} from './utils/useServiceRateInit';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useServiceRates} from './utils/useServiceRate';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getServiceRateFields} from '../../../../store/slices/onBoarding/setUpService/rates/Field/serviceRateFieldAction';
import {getRateFieldValue} from '../../../../store/slices/onBoarding/setUpService/rates/FieldValue/rateFieldValueAction';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import SubmitButton from '../../../../components/common/Form/SubmitButton';
import BottomSpacing from '../../../../components/UI/BottomSpacing';
import {CancelToken} from 'apisauce';
interface Props {
  navigation: any;
  route: any;
}
const Rates = ({navigation, route}: Props) => {
  const {serviceSetup} = useAppSelector(
    (state: {serviceSetup: any}) => state?.serviceSetup,
  );

  const {itemId, name, image, description, serviceId, providerServicesId} =
    serviceSetup.routeData;
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {
    handleRates,
    loading,
    btnLoading,
    fLoading,
    serviceRateFields,
    fieldValue,
    ratesMeta,
  } = useServiceRates(serviceSetup, navigation, route);
  useEffect(() => {
    const source = CancelToken.source();
    dispatch(getServiceRateFields(serviceId));
    dispatch(getRateFieldValue(providerServicesId));
    return () => {
      source.cancel();
    };
  }, [providerServicesId, serviceId]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getServiceRateFields(serviceId));
    await dispatch(getRateFieldValue(providerServicesId));
    setRefreshing(false);
  }, []);

  const data = useServiceRateInit(fieldValue, ratesMeta);

  return (
    <>
      {loading || fLoading || refreshing ? (
        <AppActivityIndicator visible={true} />
      ) : (
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
            initialValues={data}
            validationSchema={BoardingSettingsSchema}
            enableReset>
            <SubRates
              rateFields={serviceRateFields}
              fieldValue={fieldValue}
              ratesMeta={ratesMeta}
              showToggle={true}
            />
            <SubmitButton
              title={'Save & Continue'}
              onPress={handleRates}
              loading={btnLoading}
            />
          </AppForm>
          <BottomSpacing />
        </KeyboardAwareScrollView>
      )}
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

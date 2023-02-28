import {RefreshControl, StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../../store/store';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useServiceSetupHooks} from './utils/useServiceSetupHooks';
import AppForm from '../../../common/Form/AppForm';
import SubRates from '../ServiceSetup/SubRates';
import ReusableHeader from '../ServiceSetup/ReusableHeader';
import AppActivityIndicator from '../../../common/Loaders/AppActivityIndicator';
import SubAvailability from '../ServiceSetup/SubAvailabilty/SubAvailability';
import {serviceSetupValidationSchema} from './utils/serviceSetupValidationSchema';
import {useServiceSetupInitialValue} from './utils/useServiceSetupInitialValue';
import SubmitButton from '../../../common/Form/SubmitButton';
import BottomSpacing from '../../../UI/BottomSpacing';
import NewSubCancellationPolicy from '../ServiceSetup/NewSubCancellationPolicy';
import NewSubPerPreference from '../ServiceSetup/NewSubPetPreference';
import NewSubYourHome from '../ServiceSetup/NewSubYourHome';

interface Props {
  route: {
    params: {
      goBack?: boolean;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const SingleServiceSetUp = ({route, navigation}: Props) => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector(state => state.serviceSetup);

  // service setup hooks
  const {
    handleOnBoard,
    serviceRateFields,
    fieldValue,
    ratesMeta,
    btnLoading,
    getRatesFieldRatesLoading,
    refreshing,
    getCancellationPolicyLoading,
    onRefresh,
    policy,
    getAttributesLoading,
    attributes,
    onboardingLoading,
  } = useServiceSetupHooks(serviceSetup, route, navigation);
  const data = useServiceSetupInitialValue(fieldValue, ratesMeta);

  return (
    <>
      {getRatesFieldRatesLoading ||
      onboardingLoading ||
      getCancellationPolicyLoading ||
      getAttributesLoading ? (
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
          <View style={{paddingHorizontal: 20}}>
            <ReusableHeader
              itemId={serviceSetup?.id}
              name={serviceSetup?.serviceType?.name}
              description={serviceSetup?.serviceType?.description}
            />
            <AppForm
              initialValues={data}
              validationSchema={serviceSetupValidationSchema}
              enableReset>
              <SubRates
                rateFields={serviceRateFields}
                fieldValue={fieldValue}
                ratesMeta={ratesMeta}
              />
              <SubAvailability />
              <NewSubCancellationPolicy policy={policy} />
              {serviceSetup?.serviceType?.slug === 'boarding' && (
                <NewSubPerPreference />
              )}
              {serviceSetup?.serviceType?.slug === 'boarding' && (
                <NewSubYourHome attributes={attributes} />
              )}
              <View style={{paddingTop: 20}}>
                <SubmitButton
                  title={'Save & Continue'}
                  onPress={handleOnBoard}
                  loading={btnLoading}
                />
              </View>
            </AppForm>
            <BottomSpacing />
            <BottomSpacing />
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default SingleServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
  },
});

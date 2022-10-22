import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../../components/common/Form/AppForm';
import SubRates from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubRates';
import {BoardingSettingsSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useServiceRateInit} from './utils/useServiceRateInit';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useServiceRates} from './utils/useServiceRate';
import {useAppSelector} from '../../../../store/store';

const Rates = () => {
  const {serviceSetup} = useAppSelector((state: { serviceSetup: any; }) => state?.serviceSetup);
  const {itemId, name, image, description} = serviceSetup.routeData;
  const {
    handleRates,
    loading,
    btnLoading,
    fLoading,
    serviceRateFields,
  } = useServiceRates(serviceSetup);

  return (
    <>
      {(loading || fLoading) && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
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
          initialValues={useServiceRateInit()}
          validationSchema={BoardingSettingsSchema}
          enableReset>
          <SubRates
            handleRates={handleRates}
            rateFields={serviceRateFields}
            loading={btnLoading}
          />
        </AppForm>
      </ScrollView>
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

import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import AppForm from '../../../../components/common/Form/AppForm';
import SubRates from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubRates';
import {BoardingSettingsSchema} from '../../../../utils/config/ValidationSchema/validationSchema';
import {useServiceRateInit} from './utils/useServiceRateInit';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useServiceRates} from './utils/useServiceRate';
interface Props {
  route: {
    params: {
      serviceId: string;
      providerServicesId: string;
    };
  };
}

const Rates = ({route}: Props) => {
  const {colors} = useTheme();
  const {handleRates, loading, serviceRateFields} =
    useServiceRates(route);

  return (
    <>
      {loading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}
        showsVerticalScrollIndicator={false}>
        <ReusableHeader />
        <AppForm
          initialValues={useServiceRateInit()}
          validationSchema={BoardingSettingsSchema}>
          <SubRates
            handleRates={handleRates}
            rateFields={serviceRateFields}
            loading={false}
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

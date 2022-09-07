import {StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppActivityIndicator from '../../../components/Loaders/AppActivityIndicator';
import AppForm from '../../../components/common/Form/AppForm';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import SubCancellationPolicy from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubCancellationPolicy';

const getPoint = '/cancellation-policy';

const CancellationPolicy = () => {
  const [policy, setPolicy] = useState([]);
  const {colors} = useTheme();
  const cancellationSchema = Yup.object()
    .shape({
      // smallDog: Yup.boolean(),
      // mediumDog: Yup.boolean(),
      // largeDog: Yup.boolean(),
      // giantDog: Yup.boolean(),
      // cat: Yup.boolean(),
    })
    .required('select at least one');

  const {request: getPolicyData, loading: policyLoader} = useApi(methods._get);
  const getAllPolicyData = async () => {
    const result = await getPolicyData(getPoint);
    console.log('joss result', result.data.data);
    setPolicy(result?.data?.data);
  };
  useEffect(() => {
    getAllPolicyData();
  }, []);

  const handlePolicy = () => {};

  return (
    <>
      {policyLoader && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ReusableHeader />
        <AppForm
          initialValues={{
            same_day: false,
            one_day: false,
            three_day: false,
            seven_day: false,
          }}
          validationSchema={cancellationSchema}>
          <SubCancellationPolicy
            handlePetPreference={handlePolicy}
            // putLoading={putLoading}
            policy={policy}
          />
        </AppForm>
      </ScrollView>
    </>
  );
};

export default CancellationPolicy;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

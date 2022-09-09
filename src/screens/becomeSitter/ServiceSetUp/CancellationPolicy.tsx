/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableHeader from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import SubCancellationPolicy from '../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubCancellationPolicy';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const getPoint = '/cancellation-policy';
const getSingleData = '/cancellation-policy/povider-policy';

const CancellationPolicy = (props: {
  navigation: {navigate: (arg0: string) => void};
  route: {params: any};
}) => {
  const [policy, setPolicy] = useState([]);
  const [singlePolicy, setSinglePolicy] = useState(null);
  const {colors} = useTheme();
  const {itemId, name, image, description} = props?.route?.params;
  // getAll policy Data
  const {request: getPolicyData, loading: policyLoader} = useApi(methods._get);
  const getAllPolicyData = async () => {
    const result = await getPolicyData(getPoint);
    setPolicy(result?.data?.data);
  };

  // get singlePolicy data
  const handleGetSingleData = async () => {
    const result = await getPolicyData(getSingleData);
    setSinglePolicy(result?.data?.data?.id);
  };
  useEffect(() => {
    getAllPolicyData();
    handleGetSingleData();
  }, []);

  // post policy id
  const {request: postRequest, loading: postLoading} = useApi(methods._post);
  const handlePolicy = async (e: any) => {
    const postPoint = `/cancellation-policy/provider-policy/${e.policyId}`;
    const result = await postRequest(postPoint);
    if(!result.ok) {
      Alert.alert(result.data.message);
    }
    if(result.ok) {
      Alert.alert(result.data.message);
      props.navigation.goBack();
    }
  };

  return (
    <>
      {policyLoader && <AppActivityIndicator visible={true} />}
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
        {/* <SmallAppForm
          initialValues={{
            policyId: singlePolicy ? singlePolicy : '',
          }}
          validationSchema={cancellationSchema}> */}
        <SubCancellationPolicy
          handlePolicy={handlePolicy}
          postLoading={postLoading}
          policy={policy}
          singlePolicy={singlePolicy}
        />
        {/* </SmallAppForm> */}
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

import {RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import SubCancellationPolicy from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubCancellationPolicy';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  setBoardingSelection,
  setSitterData,
} from '../../../../store/slices/onBoarding/initial';
import {
  getCancellationPolicy,
  getSingleCancellationPolicy,
} from '../../../../store/slices/onBoarding/setUpService/cancellationPolicy/getCancellationPolicy';
import ScrollViewRapper from '../../../../components/common/ScrollViewRapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';

const CancellationPolicy = () => {
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {policy, singleProviderPolicy, loading} = useAppSelector(
    (state: any) => state?.cancellationPolicy,
  );
  const {itemId, name, image, description} = serviceSetup.routeData;
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   policy === null && dispatch(getCancellationPolicy());
  //   singleProviderPolicy === null && dispatch(getSingleCancellationPolicy());
  // }, [dispatch, policy, singleProviderPolicy]);

  // post policy id
  const {request: postRequest, loading: postLoading} = useApi(methods._post);
  const handlePolicy = async (e: any) => {
    const postPoint = `/cancellation-policy/provider-policy/${e.policyId}`;
    const result = await postRequest(postPoint);
    if (result?.data?.data) {
      dispatch(setBoardingSelection({pass: 2}));
      dispatch(setSitterData({pass: 1}));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getCancellationPolicy());
    await dispatch(getSingleCancellationPolicy());
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
        <SubCancellationPolicy
          handlePolicy={handlePolicy}
          postLoading={postLoading}
          policy={policy}
          singlePolicy={singleProviderPolicy}
        />
      </KeyboardAwareScrollView>
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

import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import SubscriptionListBody from '../../../components/ScreenComponent/profile/SubscriptionList/SubscriptionListBody';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {format} from 'date-fns';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {baseUrlV} from '../../../utils/helpers/httpRequest';
const listEndpoint = `${baseUrlV}/v1/subscriptions/all-subscriptions?page=1&limit=20&sortBy=createdAt&sortOrder=desc`;
const SubscriptionList = () => {
  const {colors} = useTheme();
  const [listData, setListData] = useState([]);
  const {request, loading} = useApi(methods._get);
  const callApi = async () => {
    const result = await request(listEndpoint);
    if (result.ok) {
      const modList = result?.data?.data?.map((item: any, index: number) => ({
        id: index,
        name: item?.membershipPlanPrice?.membershipPlan.displayName,
        payment: item?.paymentStatus,
        status: item?.status,
        startDate: format(new Date(item.currentPeriodStart), 'yyyy-MM-dd'),
        endDate: format(new Date(item.currentPeriodEnd), 'yyyy-MM-dd'),
        last4: item.card?.last4,
        cardBrand: item.card?.brand,
      }));
      setListData(modList);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  return (
    <>
      {loading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <View
          style={[
            styles.rootContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <SubscriptionListBody data={listData} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
  },
  container: {flex: 1},
});

export default SubscriptionList;

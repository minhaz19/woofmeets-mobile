/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import HeaderText from '../../../components/common/text/HeaderText';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {getSubscription} from '../../../store/slices/onBoarding/Subscriptions/subscriptionAction';
const SubscriptionScreen = (props: {
  navigation: {navigate: (arg0: string) => any; goBack: () => void};
}) => {
  const {colors} = useTheme();
  const [sequence, setSequence] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {loading, plans} = useAppSelector(state => state.subscription);
  const formattedPackageRate = plans?.map((item: any) => ({
    id: item.id,
    sequence: item.id,
    title: item.displayName,
    description: 'Only 5% Service Fee For All Unlimited Appointments',
    price: item.monthlyRate,
    annualRate: item.annualRate,
    details: item.features?.map((des: any, i: number) => ({
      id: i + 1,
      description: des,
    })),
  }));

  const onPressEvent = (id: number) => {
    setSequence(id);
  };
  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  return (
    <>
      {loading && <AppActivityIndicator />}
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <BigText text="Choose A Subscription" textStyle={styles.textStyle} />
        <HeaderText
          text="Choose a subscription that works for you"
          textStyle={styles.textStyle}
        />
        <TitleText
          text="Lorem ipsum description about the subscription packs"
          textStyle={{...styles.textStyle, paddingBottom: 10}}
        />
        {formattedPackageRate?.map((item: any) => (
          <PackageCard
            item={item}
            onPressEvent={onPressEvent}
            sequence={sequence}
            key={item.id}
            navigation={{
              goBack: () => {},
            }}
          />
        ))}
        <View style={styles.footerContainer}>
          <ButtonCom
            title="Choose Plan"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => props.navigation.goBack()}
            //   loading={loading}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  footerContainer: {
    paddingHorizontal: '20%',
    paddingBottom: 100,
    paddingTop: 40,
  },
  textStyle: {
    paddingTop: 10,
  },
});

export default SubscriptionScreen;

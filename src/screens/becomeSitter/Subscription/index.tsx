/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useSubscription} from './utils/useSubscription';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';
import Screen from '../../../components/common/Screen';
import Welcome from '../../../components/ScreenComponent/becomeSitter/subscription/Welcome/Welcome';
// import {useAppSelector} from '../../../store/store';
import Colors from '../../../constants/Colors';
import QuestionModals from '../../../components/ScreenComponent/becomeSitter/subscription/QuestionModal/QuestionModals';
interface Props {
  route: any;
}
const SubscriptionScreen = ({route}: Props) => {
  const opk = route?.params?.opk;
  const {colors} = useTheme();
  const {
    onPressEvent,
    loading,
    pLoading,
    formattedPackageRate,
    sequence,
    handleSubmit,
    planLoading,
    currentPlan,
    ssLoading,
    cardLoading,
  } = useSubscription();
  console.log('current', currentPlan, formattedPackageRate);
  return (
    <Screen style={{flex: 1}}>
      {(loading || planLoading) && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        {currentPlan ? (
          <>
            <Welcome
              item={currentPlan?.subscriptionInfo?.membershipPlanPrice}
              opk={opk}
              subscriptionId={
                currentPlan?.subscriptionInfo?.membershipPlanPrice
                  .membershipPlanId
              }
            />
          </>
        ) : (
          <>
            <QuestionModals />
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
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                title="Choose Plan"
                onSelect={handleSubmit}
                loading={pLoading || ssLoading || cardLoading}
              />
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
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
  textStyle1: {
    paddingTop: 10,
    color: Colors.primary,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;

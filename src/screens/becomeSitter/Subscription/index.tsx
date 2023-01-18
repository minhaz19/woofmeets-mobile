/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useSubscription} from './utils/useSubscription';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';
// import Screen from '../../../components/common/Screen';
import Welcome from '../../../components/ScreenComponent/becomeSitter/subscription/Welcome/Welcome';
import Colors from '../../../constants/Colors';
import QuestionModals from '../../../components/ScreenComponent/becomeSitter/subscription/QuestionModal/QuestionModals';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import TitleText from '../../../components/common/text/TitleText';
interface Props {
  route: any;
  navigation: any;
}
const SubscriptionScreen = ({route, navigation}: Props) => {
  const opk = route?.params?.opk;
  const headerBack = route?.params?.headerBack;
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
  } = useSubscription(opk);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      {(loading || planLoading) && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[styles.container]}>
        {currentPlan ? (
          <>
            <Welcome
              item={currentPlan?.subscriptionInfo?.membershipPlanPrice}
              opk={opk}
              subscriptionId={
                currentPlan?.subscriptionInfo?.membershipPlanPrice
                  .membershipPlanId
              }
              currentPlan={currentPlan}
              headerBack={headerBack}
            />
          </>
        ) : (
          <>
            {opk === 'current_plan' && (
              <AppTouchableOpacity
                style={styles.leftContainer}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons
                  name="ios-chevron-back"
                  size={
                    SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28
                  }
                  style={styles.iconStyle}
                  color={Colors.primary}
                />
                <TitleText text={'Back'} textStyle={styles.backText} />
              </AppTouchableOpacity>
            )}
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
                loading={pLoading || ssLoading}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
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
  iconStyle: {paddingRight: 5},
  leftContainer: {
    // position: 'absolute',

    // left: '2%',
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {color: Colors.primary, fontWeight: 'bold'},
});

export default SubscriptionScreen;

/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import PackageCard from '../../../components/ScreenComponent/becomeSitter/subscription/packages/PackageCard';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import HeaderText from '../../../components/common/text/HeaderText';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useSubscription} from './utils/useSubscription';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import ButtonCom from '../../../components/UI/ButtonCom';
import Screen from '../../../components/common/Screen';
import Welcome from '../../../components/ScreenComponent/becomeSitter/subscription/Welcome/Welcome';
import {useAppSelector} from '../../../store/store';
import Colors from '../../../constants/Colors';
import {QuestionIcon} from '../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../components/common/text/DescriptionText';
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
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [basicQuestionModal, setBasicQuestionModal] = useState(false);
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
              subscriptionId={currentPlan?.subscriptionInfo?.id}
            />
          </>
        ) : (
          <>
            <BigText
              text="Choose A Subscription"
              textStyle={styles.textStyle}
            />
            <HeaderText
              text="Choose a subscription that works for you"
              textStyle={styles.textStyle}
            />
            {/* No 1 */}
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
              onPress={() => setFaq1(!faq1)}>
              <QuestionIcon fill={Colors.primary} />
              <TitleText
                text="So, How Does the Basic Plan Work?"
                textStyle={{...styles.textStyle1, paddingBottom: 10}}
              />
            </TouchableOpacity>
            {faq1 && (
              <DescriptionText
                text={`The Basic Woofmeets plan is simple and straightforward. With this tier, we will run a basic background check for a one-time fee of $35. If you get a Premium subscription (starting from 1st November), that includes an enhanced background check. In other words, if you select any of the Premium plans, you don’t need to pay that one-time background check fee.

You can upgrade, downgrade or cancel at any time with just a few clicks.`}
              />
            )}
            {/* No 2 */}
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
              onPress={() => setFaq2(!faq2)}>
              <QuestionIcon fill={Colors.primary} />
              <TitleText
                text="Why do you need a credit card for the basic plan?"
                textStyle={{...styles.textStyle1, paddingBottom: 10}}
              />
            </TouchableOpacity>
            {faq2 && (
              <DescriptionText
                text={`Your credit card is necessary for us to charge you for the one-time $35 background check fee that is part of the Basic tier.`}
              />
            )}
            {/* No 3 */}
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
              onPress={() => setFaq3(!faq3)}>
              <QuestionIcon fill={Colors.primary} />
              <TitleText
                text="How do I cancel if I'm not satisfied with my experience as a woofmeets sitter"
                textStyle={{...styles.textStyle1, paddingBottom: 10}}
              />
            </TouchableOpacity>
            {faq3 && (
              <DescriptionText
                text={`We make it simple to upgrade, downgrade, or cancel if you’re not happy with your experience working with Woofmeets. If you cancel your Premium plan, we will automatically downgrade you to a Basic plan. If this happens, we will not charge you the $35 for a background check since you’re coming from a plan where we would have already run an enhanced background check.

Please note that you are paying for plans on a monthly basis, so any part of that month for which you have already paid will not be refunded.`}
              />
            )}
            {/* No 4  */}
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
              onPress={() => setBasicQuestionModal(!basicQuestionModal)}>
              <QuestionIcon fill={Colors.primary} />
              <TitleText
                text="Why do we charge you $35 USD as part of the basic plan?"
                textStyle={{...styles.textStyle1, paddingBottom: 10}}
              />
            </TouchableOpacity>
            {basicQuestionModal && (
              <DescriptionText
                text={`The reason why we charge you $35 as part of the Basic tier plan is that it costs that amount to run a background check on you. This is a fundamental part of the hiring process that we can’t neglect. It’s something that all of our clients will expect before we make you a part of our pet-sitting community.

You should also understand that if you want to avoid this one-time fee, you can sign up for one of our Premium tiers instead. With those tiers, we waive the $35 fee. Note that you will receive a confirmation email after you make your one-time payment.`}
              />
            )}
            <View style={{paddingTop: 10}} />
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

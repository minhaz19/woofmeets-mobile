/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import TitleText from '../../../../common/text/TitleText';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
interface Props {
  upgradePlan?: boolean;
}
const QuestionModals = ({}: Props) => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  // const [faq4, setFaq4] = useState(false);
  const [basicQuestionModal, setBasicQuestionModal] = useState(false);
  return (
    <View>
      <BigText text="Choose A Subscription" textStyle={styles.textStyle} />
      <HeaderText
        text="Choose a subscription that works for you"
        textStyle={styles.textStyle}
      />
      {/* No 1 */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => setFaq1(!faq1)}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="So, How Does the Basic Plan Work?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq1 && (
        <DescriptionText
          text={`The Basic Woofmeets plan is simple and straightforward. With this tier, we will run a basic background check for a one-time fee of $35. If you get a Premium subscription (starting from 1st November), that includes an enhanced background check. In other words, if you select any of the Premium plans, you don’t need to pay that one-time background check fee.
You can upgrade, downgrade or cancel at any time with just a few clicks.`}
        />
      )}
      {/* No 2 */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => setFaq2(!faq2)}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="Why do you need a credit card for the basic plan?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq2 && (
        <DescriptionText
          text={
            'Your credit card is necessary for us to charge you for the one-time $35 background check fee that is part of the Basic tier.'
          }
        />
      )}
      {/* No 3 */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => setFaq3(!faq3)}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="How do I cancel if I'm not satisfied with my experience as a woofmeets sitter"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq3 && (
        <DescriptionText
          text={`We make it simple to upgrade, downgrade, or cancel if you’re not happy with your experience working with Woofmeets. If you cancel your Premium plan, we will automatically downgrade you to a Basic plan. If this happens, we will not charge you the $35 for a background check since you’re coming from a plan where we would have already run an enhanced background check.

Please note that you are paying for plans on a monthly basis, so any part of that month for which you have already paid will not be refunded.`}
        />
      )}
      {/* No 4  */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => setBasicQuestionModal(!basicQuestionModal)}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="Why do we charge you $35 USD as part of the basic plan?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {basicQuestionModal && (
        <DescriptionText
          text={`The reason why we charge you $35 as part of the Basic tier plan is that it costs that amount to run a background check on you. This is a fundamental part of the hiring process that we can’t neglect. It’s something that all of our clients will expect before we make you a part of our pet-sitting community.

You should also understand that if you want to avoid this one-time fee, you can sign up for one of our Premium tiers instead. With those tiers, we waive the $35 fee. Note that you will receive a confirmation email after you make your one-time payment.`}
        />
      )}
      <View style={{paddingTop: 10}} />
    </View>
  );
};

export default QuestionModals;

const styles = StyleSheet.create({
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

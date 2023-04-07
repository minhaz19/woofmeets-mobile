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
  const [faq4, setFaq4] = useState(false);
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
        onPress={() => {
          setFaq1(!faq1);
          setFaq2(false);
          setFaq3(false);
          setFaq4(false);
        }}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="How Do the Woofmeets Plans Work?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq1 && (
        <DescriptionText
          textStyle={styles.desText}
          text={
            '  The Basic plan is free, with no monthly subscription fee. However, it includes a 9% service charge on all appointments. This plan includes access to basic features such as creating a profile as a pet sitter and browsing other pets in your area. \n\n The Gold plan is priced at $79 per month and includes a 2% service charge on all appointments. It includes additional features such as the ability to audio/video conference with pet owners, access to exclusive events, and priority support. \n\n The Platinum plan is the most comprehensive option, priced at $149 per month. It has 0% service charge on all appointments. It includes all of the features of the Gold plan, as well as premium features.'
          }
        />
      )}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => {
          setFaq2(!faq2);
          setFaq1(false);
          setFaq3(false);
          setFaq4(false);
        }}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="Do You Need a Credit Card for the Basic Plan?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq2 && (
        <DescriptionText
          textStyle={styles.desText}
          text={
            "Our basic plan is a great option for those who are just starting out and want to try our services without committing to a long-term contract or providing a credit card. This plan is flexible and easy to use, and it allows you to test out our features and see if they meet your needs. With no credit card required, you can sign up and start using our service right away, and upgrade or cancel at any time. It's a low-risk and affordable way to see if our service is right for you."
          }
        />
      )}
      {/* No 3 */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => {
          setFaq3(!faq3);
          setFaq2(false);
          setFaq1(false);
          setFaq4(false);
        }}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="Is Basic Plan Absolutely Free?"
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq3 && (
        <DescriptionText
          textStyle={styles.desText}
          text={
            " Our basic plan is a great option for those looking to get started with our service without any financial commitment. It is completely free and offers a variety of features and benefits that can help you achieve your goals. Some of the features included in our basic plan include access to our online platform, customer support, and regular updates and upgrades. With our basic plan, you can explore all that our service has to offer without having to worry about any hidden costs or fees. It's a great way to test out our service and see if it's the right fit for you."
          }
        />
      )}
      {/* No 4  */}
      <AppTouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}
        onPress={() => {
          setFaq3(false);
          setFaq2(false);
          setFaq1(false);
          setFaq4(!faq4);
        }}>
        <QuestionIcon fill={Colors.primary} />
        <TitleText
          text="How Do I Cancel if I'm Not Satisfied with My Experience as a Woofmeets Sitter? "
          textStyle={{...styles.textStyle1, paddingBottom: 10}}
        />
      </AppTouchableOpacity>
      {faq4 && (
        <DescriptionText
          textStyle={styles.desText}
          text={
            "We make it simple to upgrade, downgrade, or cancel if you're not happy with your experience working with Woofmeets. If you cancel your Premium plan, we will automatically downgrade you to a Basic plan. Please note that you are paying for plans on a monthly basis, so any part of that month for which you have already paid will not be refunded."
          }
        />
      )}
      <View style={{paddingTop: 10}} />
    </View>
  );
};

export default QuestionModals;

const styles = StyleSheet.create({
  textStyle: {
    paddingVertical: 20,
  },
  textStyle1: {
    paddingTop: 10,
    color: Colors.primary,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  desText: {
    padding: 10,
    textAlign: 'justify',
    borderWidth: 1,
    color: Colors.black,
    borderColor: Colors.border,
    backgroundColor: Colors.primaryLight,
  },
});

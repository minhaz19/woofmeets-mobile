import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import HeaderText from '../../components/common/text/HeaderText';
import ProfileInfo from '../../components/ScreenComponent/profile/BasicInfo/ProfileInfo';
import TitleText from '../../components/common/text/TitleText';
import BigText from '../../components/common/text/BigText';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Pricing from '../../components/ScreenComponent/Inbox/Past/Pricing';
import ButtonCom from '../../components/UI/ButtonCom';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import BottomSpacingNav from '../../components/UI/BottomSpacingNav';

const CheckoutDetails = () => {
  const {colors} = useTheme();
  const [promoCode, setPromoCode] = useState<string>();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}
      keyboardVerticalOffset={120}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <BigText text="Review and Payment" />
          <View style={styles.profileContainer}>
            <ProfileInfo />
          </View>
          <BigText text="Stay Details" />
          <HeaderText
            textStyle={{...styles.textStyle, ...styles.textPadding}}
            text="Boarding"
          />
          {/* Boarding Details */}
          <TitleText text="In their home" textStyle={styles.textPadding} />
          <View style={styles.dateContainer}>
            <TitleText text="Jun 14, 2022" textStyle={styles.textPadding} />
            <TitleText text=" - " textStyle={styles.textPadding} />
            <TitleText text="Jun 16, 2022" textStyle={styles.textPadding} />
          </View>
          <View style={styles.dateContainer}>
            <TitleText text="Starts 10:00 AM" textStyle={styles.textPadding} />
            <TitleText text=" - " textStyle={styles.textPadding} />
            <TitleText text="11:00 AM" textStyle={styles.textPadding} />
          </View>
          <View style={styles.dateContainer}>
            <TitleText text="Ends 2:00PM" textStyle={styles.textPadding} />
            <TitleText text=" - " textStyle={styles.textPadding} />
            <TitleText text="2:00PM" textStyle={styles.textPadding} />
          </View>
          <TitleText text="With Tommy" textStyle={styles.textPadding} />
          {/* Charges & Services */}
          <Pricing />
          {/* Promo Code */}
          <BigText text="Enter Promo code" textStyle={styles.textPadding} />
          <View style={styles.promoContainer}>
            <View style={styles.widthTextBox}>
              <TextInput
                placeholder="Enter zip code"
                value={promoCode}
                onChangeText={pCode => setPromoCode(pCode)}
                style={[styles._input, {color: colors.headerText}]}
              />
            </View>
            <TouchableOpacity style={styles.widthApply}>
              <HeaderText text="Apply" textStyle={styles.applyText} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <ButtonCom
            title="Add to Pay"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => {}}
          />
        </View>
        <BottomSpacingNav />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: '5%',
  },
  profileContainer: {
    paddingVertical: 20,
    // paddingLeft: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
  },
  boxContainer: {paddingHorizontal: '10%'},
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 45 : 50,
    fontSize: Text_Size.Text_1,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  widthTextBox: {
    width: '80%',
  },
  textStyle: {
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
  },
  textPadding: {
    paddingVertical: 5,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  widthApply: {
    width: '20%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 45 : 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: 'white',
  },
  footerContainer: {
    paddingHorizontal: '5%',
  },
});

export default CheckoutDetails;

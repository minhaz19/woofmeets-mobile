import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import HeaderText from '../../components/common/text/HeaderText';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import ButtonCom from '../../components/UI/ButtonCom';
import {btnStyles} from '../../constants/theme/common/buttonStyles';
import InputText from '../../components/common/input/InputText';

const ContactScreen = () => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={styles.nameContainer}>
        <HeaderText text="Add your phone number" textStyle={styles.textStyle} />
      </View>
      <View style={styles.textInfoContainer}>
        <InputText
          title="Phone number"
          placeholder="Enter Phone number"
          value={undefined}
          setValue={() => {}}
        />
      </View>
      <View style={styles.nameContainer}>
        <HeaderText text="Add Emergency Contact" textStyle={styles.textStyle} />
      </View>
      <View style={styles.textInfoContainer}>
        <InputText
          title="Emergency Contact Name"
          placeholder="Enter Emergency Contact Name"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="Email"
          placeholder="Enter Email"
          value={undefined}
          setValue={() => {}}
        />
        <InputText
          title="Phone number"
          placeholder="Enter Phone number"
          value={undefined}
          setValue={() => {}}
        />
      </View>
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Save'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
        <View style={styles.termsContainer}>
          <Text style={[styles.details, {color: colors.lightText}]}>
            By adding your phone number, you're saying it's okay for us to send
            you service-related text messages, including autodialed. You can
            adjust these settings anytime on the Notifications Preferences page.
            Reply HELP for help and STOP to unsubscribe. Message frequency
            varies. Message and data rates may apply. For more, see our{' '}
            <Text
              style={[
                styles.details,
                {color: Colors.primary, textDecorationLine: 'underline'},
              ]}>
              Terms of Service
            </Text>
            <Text style={[styles.details, {color: colors.lightText}]}>
              {' '}
              and{' '}
            </Text>
            <Text
              style={[
                styles.details,
                {color: Colors.primary, textDecorationLine: 'underline'},
              ]}>
              Privacy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  footerContainer: {
    paddingTop: '6%',
    paddingHorizontal: '5%',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nameContainer: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    width: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    borderRadius: 50,
  },
  addContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    height: 24,
    width: 24,
    bottom: 0,
    right: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
  },
  termsContainer: {
    flexDirection: 'row',
  },
  details: {
    fontSize: Text_Size.Text_8,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  textInfoContainer: {
    width: '95%',
    paddingLeft: '5%',
  },
});

export default ContactScreen;

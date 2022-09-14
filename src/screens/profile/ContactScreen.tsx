import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import ContactInput from '../../components/ScreenComponent/setting/ContactInput';
import {contactValues} from '../../utils/config/setting/initalValues';
import {contactValidationSchema} from '../../utils/config/setting/validationSchema';
import BottomSpacing from '../../components/UI/BottomSpacing';
import { getContactInfo, postContactInfo } from '../../store/slices/profile/contact';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setProfileData } from '../../store/slices/onBoarding/initial';
import AppFormReset from '../../components/common/Form/AppFormReset';

const ContactScreen = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const emergencyContactSubmit = (contactData: any) => {
    dispatch(postContactInfo(contactData));
    dispatch(setProfileData({pass:1}))
  };
  const [refreshing, setRefreshing] = useState(false);
  const contact = useAppSelector(
    state => state.contact,
  );

  console.log(contact);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getContactInfo());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <AppFormReset
        initialValues={contact.contactInfo ? {  emergencyContactName: contact.contactInfo.name,
        email: contact.contactInfo.email,
        phone: contact.contactInfo.phone,
        emergencyPhone: contact.contactInfo.phone} : contactValues}
        validationSchema={contactValidationSchema}>
        <ContactInput handleSubmit={emergencyContactSubmit} navigation={props.navigation} />
      </AppFormReset>
      <View style={styles.footerContainer}>
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
      <BottomSpacing />
    </ScrollView>
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

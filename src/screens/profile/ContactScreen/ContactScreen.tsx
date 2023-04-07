/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import ContactInput from '../../../components/ScreenComponent/setting/ContactInput';
import {contactValidationSchema} from '../../../utils/config/setting/validationSchema';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {
  getContactInfo,
  postContactInfo,
} from '../../../store/slices/profile/contact';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {setProfileData} from '../../../store/slices/onBoarding/initial';
import AppForm from '../../../components/common/Form/AppForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';

const ContactScreen = ({route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const contact = useAppSelector(state => state.contact);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const emergencyContactSubmit = async (contactData: any) => {
    await dispatch(postContactInfo(contactData)).then(() => {
      if (route?.name) {
        navigation.goBack();
      }
    });
    await dispatch(setProfileData({pass: 1}));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getContactInfo());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      {contact.getLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[
            styles.rootContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}
          extraHeight={100}
          extraScrollHeight={200}
          enableAutomaticScroll={true}
          enableOnAndroid={true}>
          <AppForm
            initialValues={{
              emergencyContactName: contact?.contactInfo?.name
                ? contact?.contactInfo?.name
                : '',
              emergencyPhone: contact?.contactInfo?.phone
                ? contact?.contactInfo?.phone
                : '',
            }}
            validationSchema={contactValidationSchema}>
            <ContactInput handleSubmit={emergencyContactSubmit} />
          </AppForm>
          <View style={styles.footerContainer}>
            <View style={styles.termsContainer}>
              <Text style={[styles.details, {color: colors.lightText}]}>
                By adding your phone number, you're saying it's okay for us to
                send you service-related text messages, including autodialed.
                You can adjust these settings anytime on the Notifications
                Preferences page. Reply HELP for help and STOP to unsubscribe.
                Message frequency varies. Message and data rates may apply. For
                more, see our{' '}
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://woofmeets.com/terms-and-conditions',
                    )
                  }>
                  <Text
                    style={[
                      styles.details,
                      {
                        color: Colors.primaryDif,
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.details, {color: colors.lightText}]}>
                  {' '}
                  and{' '}
                </Text>
                <Text
                  style={[
                    styles.details,
                    {color: Colors.primaryDif, textDecorationLine: 'underline'},
                  ]}>
                  Privacy
                </Text>
              </Text>
            </View>
          </View>
          {/* <BottomSpacing /> */}
          <BottomSpacing />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  footerContainer: {
    // paddingHorizontal: '5%',
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
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'justify',
    letterSpacing: 0.6,
  },
  textInfoContainer: {
    width: '95%',
    paddingLeft: '5%',
  },
});

export default ContactScreen;

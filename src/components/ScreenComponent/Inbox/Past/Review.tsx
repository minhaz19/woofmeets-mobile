/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {FC, useState} from 'react';
import {SCREEN_HEIGHT} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {AirbnbRating} from 'react-native-ratings';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import IOSButton from '../../../UI/IOSButton';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import HeaderText from '../../../common/text/HeaderText';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {getProviderApnt} from '../../../../store/slices/Appointment/Inbox/Provider/Pending/getProviderApnt';
import {useNavigation} from '@react-navigation/native';
import BottomSpacing from '../../../UI/BottomSpacing';

interface Props {
  setIsReviewModal: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
  appointmentId: string;
}

const Review: FC<Props> = props => {
  const {colors, isDarkMode} = useTheme();
  const [isRatings, setIsRatings] = useState(5);
  const [isEnjoyRating, setIsEnjoyRating] = useState(5);
  const [isText, setIsText] = useState('');
  const [enjoyText, setEnjoyText] = useState('');
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state: any) => state.whoAmI);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const navigation = useNavigation();
  // handleRatings
  const handleRatings = (value: number) => {
    setIsRatings(value);
  };
  const handleEnjoyRatings = (value: number) => {
    setIsEnjoyRating(value);
  };
  const endPoint = '/review';
  const {loading, request} = useApi(methods._post);
  const handleSubmit = async () => {
    let formattedData;
    if (user?.provider?.isApproved) {
      formattedData = {
        appointmentId: props.appointmentId,
        rating: isRatings,
        comment: isText,
      };
    } else {
      formattedData = {
        appointmentId: props.appointmentId,
        rating: isRatings,
        comment: isText,
        providerServiceRating: isEnjoyRating,
        providerServiceComment: enjoyText,
      };
    }
    const result = await request(endPoint, formattedData);
    if (result.ok) {
      props.setIsReviewModal(false);
      dispatch(getProviderApnt(proposedServiceInfo.appointmentOpk));
      navigation.navigate('Inbox');
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <HeaderText
              text={
                user?.provider?.isApproved
                  ? 'How do you want to rate the owner?'
                  : 'How do you want to rate the sitter?'
              }
              textStyle={styles.header}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={isRatings}
              size={50}
              onFinishRating={value => handleRatings(value)}
            />
          </View>
          <View
            style={[
              styles.container,
              {
                borderColor: Colors.border,
              },
            ]}>
            <TextInput
              placeholderTextColor={'gray'}
              allowFontScaling={false}
              style={[styles.text, {color: 'black'}]}
              placeholder="Write your Comments"
              multiline={true}
              onChangeText={value => setIsText(value)}
            />
          </View>
          {!user?.provider?.isApproved && (
            <>
              <View>
                <HeaderText
                  text={'How do you enjoy the service?'}
                  textStyle={styles.header}
                />
                <AirbnbRating
                  showRating={false}
                  count={5}
                  defaultRating={isEnjoyRating}
                  size={50}
                  onFinishRating={value => handleEnjoyRatings(value)}
                />
              </View>
              <View
                style={[
                  styles.container,
                  {
                    borderColor: Colors.border,
                  },
                ]}>
                <TextInput
                  placeholderTextColor={'gray'}
                  allowFontScaling={false}
                  style={[styles.text, {color: 'black'}]}
                  placeholder="Write your Comments"
                  multiline={true}
                  onChangeText={value => setEnjoyText(value)}
                />
              </View>
            </>
          )}
          <ButtonCom
            title="Submit"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={handleSubmit}
            loading={loading}
          />
          <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={() => props.setIsReviewModal(false)}
            textAlignment={{
              backgroundColor: colors.backgroundColor,
              borderColor: colors.borderColor,
              borderWidth: 1,
              borderRadius: 100,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            titleStyle={{
              color: colors.lightText,
            }}
            title={'Close'}
          />
          <BottomSpacing />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontFamily: 'Muli',
    flex: 1,
    alignSelf: 'flex-start',
    height: 120,
    width: '100%',
    fontSize: Text_Size.Text_11,
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  header: {
    fontSize: Text_Size.Text_2,
    marginVertical: 10,
  },
});

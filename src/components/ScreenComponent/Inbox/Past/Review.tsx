/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
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
import PetsReview from './PetsReview';
import {baseUrlV} from '../../../../utils/helpers/httpRequest';

interface Props {
  setIsReviewModal: (value: boolean) => void;
  setHasModalShown: (value: boolean) => void;
  setModalVisible: (arg1: boolean) => void;
  appointmentId: string;
}

const Review: FC<Props> = props => {
  const {colors} = useTheme();
  const [isRatings, setIsRatings] = useState(5);
  const [isEnjoyRating, setIsEnjoyRating] = useState(5);
  const [woofmeetsRating, setWoofmeetsRating] = useState(5);
  const [WoofmeetsText, setWoofmeetsText] = useState('');
  const [isText, setIsText] = useState('');
  const [enjoyText, setEnjoyText] = useState('');
  const [petsReview, setPetReview] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state: any) => state.whoAmI);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const navigation = useNavigation<any>();
  // handleRatings
  const handleWoofmeetsRating = (value: number) => {
    setWoofmeetsRating(value);
  };
  const handleRatings = (value: number) => {
    setIsRatings(value);
  };
  const handleEnjoyRatings = (value: number) => {
    setIsEnjoyRating(value);
  };
  useEffect(() => {
    proposedServiceInfo?.petsInfo?.map((item: any) => {
      return setPetReview(petsetReview => [
        ...petsetReview,
        {
          petId: item?.petId,
          rating: 5,
          comment: null,
        },
      ]);
    });
  }, []);

  const endPoint = `${baseUrlV}/v2/review`;
  const {loading, request} = useApi(methods._post);
  const handleSubmit = async () => {
    let formattedData;
    if (proposedServiceInfo?.userId !== user?.provider?.userId) {
      formattedData = {
        appointmentId: props.appointmentId,
        rating: isRatings,
        comment: isText,
        petsReview,
        platformRating: woofmeetsRating,
        platformComment: WoofmeetsText,
      };
    } else {
      formattedData = {
        appointmentId: props.appointmentId,
        rating: isRatings,
        comment: isText,
        providerServiceRating: isEnjoyRating,
        providerServiceComment: enjoyText,
        platformRating: woofmeetsRating,
        platformComment: WoofmeetsText,
      };
    }
    const result = await request(endPoint, formattedData);
    if (result.ok) {
      props.setIsReviewModal(false);
      dispatch(getProviderApnt(proposedServiceInfo?.appointmentOpk));
      navigation.navigate('Inbox', {
        back: true,
        screen: 'InboxNavigator',
      });
      // navigation.navigate('Inbox');
    } else {
      Alert.alert('something went wrong! please try again later');
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
              text={'Rate the Woofmeets Platform'}
              textStyle={styles.header}
            />
            <AirbnbRating
              showRating={false}
              count={5}
              defaultRating={woofmeetsRating}
              size={50}
              onFinishRating={value => handleWoofmeetsRating(value)}
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
              onChangeText={value => setWoofmeetsText(value)}
            />
          </View>
          <View>
            <HeaderText
              text={
                proposedServiceInfo?.userId === user?.provider?.userId
                  ? 'How do you want to rate the sitter?'
                  : 'How do you want to rate the owner?'
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
          {proposedServiceInfo?.userId !== user?.provider?.userId &&
            proposedServiceInfo?.petsInfo.map((data: any, index: number) => (
              <PetsReview
                pet={data}
                key={index}
                petsReview={petsReview}
                setPetReview={setPetReview}
              />
            ))}
          {proposedServiceInfo?.userId === user?.provider?.userId && (
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
            onSelect={() => {
              props.setIsReviewModal(false);
              // props.setHasModalShown(true);

              navigation.setParams({
                showReview: false,
              });
            }}
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

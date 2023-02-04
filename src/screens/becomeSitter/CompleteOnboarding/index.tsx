import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useAppSelector} from '../../../store/store';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {API_URL} from '@env';
import CompletionModal from '../../../components/ScreenComponent/becomeSitter/CompleteOnboarding/CompletionModal';
import {useNavigation} from '@react-navigation/native';
const url = `${API_URL}/v2/user-profile/submit-onboarding-process`;
const CompleteOnboarding = () => {
  const {sitterData, boardingSelection, profileData} = useAppSelector(
    state => state.initial,
  );
  const {request, loading} = useApi(methods._post);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const text =
    // (!sitterData[0]?.isCompleted ? sitterData[0]?.title.toUpperCase() : '') +
    // (!sitterData[0]?.isCompleted ? ', ' : '') +
    (!boardingSelection[0].isCompleted ||
    !boardingSelection[1].isCompleted ||
    !boardingSelection[2].isCompleted
      ? sitterData[1]?.title.toUpperCase() + ', '
      : '') +
    (!profileData[0].isCompleted ||
    !profileData[1].isCompleted ||
    !profileData[2].isCompleted
      ? sitterData[2]?.title.toUpperCase() + ', '
      : '') +
    (!sitterData[3]?.isCompleted
      ? sitterData[3]?.title.toUpperCase() + ' '
      : '');
  const handleSubmit = async () => {
    if (
      boardingSelection[0].isCompleted &&
      boardingSelection[1].isCompleted &&
      boardingSelection[2].isCompleted &&
      profileData[0].isCompleted &&
      profileData[1].isCompleted &&
      profileData[2].isCompleted &&
      sitterData[3].isCompleted
    ) {
      Alert.alert(
        'Profile Submission',
        'Are you sure you want to submit your profile',
        [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Yes',
            onPress: async () => {
              const result = await request(url);
              if (result.ok) {
                setModalVisible(true);
                setTimeout(() => {
                  navigation.navigate('MyAccount');
                }, 2000);
              }
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Warning!',
        `Please complete "${text}" step to move forward. Thanks!`,
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require('../../../assets/completeOnboarding.json')}
        style={styles.animation}
      />
      <View style={styles.textContainer}>
        <ShortText
          textStyle={styles.text}
          text={
            'Owala!, You are in the final step. Once you submit your profile, You will receive an email from Checkr, the background check company used by Woofmeets. Follow the link in the email to fill out a form with your personal information. Complete all required fields for accurate and quick processing.\n\nThe Woofmeets team will receive your background check within 5-7 business days. If accepted, your profile will be activated and you can begin accepting clients and earning money on the platform.'
          }
        />
      </View>
      <ButtonCom
        title={'Submit Your Profile'}
        loading={loading}
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={handleSubmit}
      />
      <CompletionModal isVisible={isModalVisible} />
    </ScrollView>
  );
};

export default CompleteOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  animation: {
    width: '80%',
    marginTop: 10,
  },
  textContainer: {
    margin: 20,
    // backgroundColor: Colors.lightShade,
    padding: 10,
    borderRadius: 4,
    marginBottom: 40,
  },
  text: {
    color: Colors.primaryDeep,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});

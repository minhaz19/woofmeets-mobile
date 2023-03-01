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

const url = `${API_URL}/v3/user-profile/submit-onboarding-process`;
const CompleteOnboarding = () => {
  const {availability, basicInfo} = useAppSelector(
    state => state.newOnboarding,
  );
  const {request, loading} = useApi(methods._post);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    if (availability?.id && basicInfo?.latitude) {
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
        `Please complete${availability?.id ? '' : ' "Service Setup"'} ${
          !availability?.id && !basicInfo?.latitude ? 'and' : ''
        } ${
          basicInfo?.latitude ? '' : '"Profile Setup"'
        } step to move forward. Thanks!`,
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  animation: {
    width: '80%',
    marginTop: 10,
  },
  textContainer: {
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: 40,
  },
  text: {
    color: Colors.primaryDeep,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});

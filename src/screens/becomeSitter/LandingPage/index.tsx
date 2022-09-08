import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import LandingCard from '../../../components/ScreenComponent/becomeSitter/landingPage';
import ButtonCom from '../../../components/UI/ButtonCom';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';

const SitterLandingPage = (props: { navigation: { navigate: (arg0: string) => any; }; }) => {
  const {colors} = useTheme();
  const sitterData = [
    {
      id: 1,
      title: 'Select Service',
      isCompleted: true,
      onPress: () => props.navigation.navigate('ServiceSelection'),
    },
    {
      id: 2,
      title: 'Set Up Services',
      isCompleted: false,
      onPress: () => props.navigation.navigate('HomeProfile'),
    },
    {
        id: 3,
        title: 'Create Your Profile',
        isCompleted: false,
        onPress: () => props.navigation.navigate('CreateProfileLanding'),
      },
      {
        id: 4,
        title: 'Safety Quiz',
        isCompleted: false,
        onPress: () => props.navigation.navigate('SafetyQuiz'),
      },
      {
        id: 5,
        title: 'Choose a Subscription',
        isCompleted: false,
      },
  ];
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      {sitterData.map(item => (
        <LandingCard key={item.id} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} />
      ))}
      <View style={styles.footerContainer}>
        <ButtonCom
          title="Submit"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
  },
  footerContainer: {
    width: '90%',
    paddingLeft: '10%',
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default SitterLandingPage;

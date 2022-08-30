import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import BigText from '../../../components/common/text/BigText';
import ButtonCom from '../../../components/UI/ButtonCom';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';

const CreateProfileLanding = (props: { navigation: { navigate: (arg0: string) => any; }; }) => {
  const {colors} = useTheme();
  const sitterData = [
    {
      id: 1,
      title: 'Basic Info',
      isCompleted: true,
      onPress: () => props.navigation.navigate('SitterBasicInfo'),
    },
    {
      id: 2,
      title: 'Phone Numbers',
      isCompleted: false,
      onPress: () => props.navigation.navigate('SitterContactScreen'),
    },
    {
        id: 3,
        title: 'Details',
        isCompleted: false,
      },
      {
        id: 4,
        title: 'Photos',
        isCompleted: false,
        onPress: () => props.navigation.navigate('GallerySitter'),
      },
      {
        id: 5,
        title: 'Your Pets',
        isCompleted: false,
        onPress: () => props.navigation.navigate('PetScreens'),
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
        <BigText text="Create Yout Profile" />
      {sitterData.map(item => (
        <ProfileItemCard title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} />
      ))}
      <View style={styles.footerContainer}>
        <ButtonCom
          title="Save and Continue"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() =>
            props.navigation.navigate('HomeProfile')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: '5%',
  },
  footerContainer: {
    width: '90%',
    paddingTop: 20,
    paddingBottom: 100,
  },
});

export default CreateProfileLanding;

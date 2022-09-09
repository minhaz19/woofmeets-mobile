import {View, StyleSheet, RefreshControl, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import BigText from '../../../components/common/text/BigText';
import ButtonCom from '../../../components/UI/ButtonCom';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getUserProfileInfo } from '../../../store/slices/userProfile/userProfileAction';
import { getContactInfo } from '../../../store/slices/profile/contact';
import { getSitterDetails } from '../../../store/slices/profile/details';

const CreateProfileLanding = (props: { navigation: { navigate: (arg0: string) => any; }; }) => {
  const {colors} = useTheme();
  const sitterData = [
    {
      id: 1,
      name: 'basicInfo',
      title: 'Basic Info',
      isCompleted: true,
      onPress: () => props.navigation.navigate('SitterBasicInfo'),
    },
    {
      id: 2,
      name: 'contact',
      title: 'Phone Numbers',
      isCompleted: false,
      onPress: () => props.navigation.navigate('SitterContactScreen'),
    },
    {
        id: 3,
        name: 'provider',
        title: 'Details',
        isCompleted: false,
        onPress: () => props.navigation.navigate('SitterDetails'),
      },
      {
        id: 4,
        name: 'Gallery',
        title: 'Photos',
        isCompleted: false,
        onPress: () => props.navigation.navigate('GallerySitter'),
      },
      {
        id: 5,
        name: 'pet',
        title: 'Your Pets',
        isCompleted: false,
        onPress: () => props.navigation.navigate('PetScreens'),
      },
  ];
  const userInfo = useAppSelector(state => state.userProfile.userInfo);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserProfileInfo());
    dispatch(getContactInfo());
    dispatch(getSitterDetails());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
        <BigText text="Create Yout Profile" />
      {sitterData.map(item => (
        <ProfileItemCard key={item.id} name={item.name} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} userInfo={userInfo} />
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
    </ScrollView>
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

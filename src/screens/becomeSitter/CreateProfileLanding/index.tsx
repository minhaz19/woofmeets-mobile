import {View, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getUserProfileInfo } from '../../../store/slices/userProfile/userProfileAction';
import { getContactInfo } from '../../../store/slices/profile/contact';
import { getSitterDetails } from '../../../store/slices/profile/details';

const CreateProfileLanding = (props: { navigation: { navigate: (arg0: string) => any; }; }) => {
  const {colors} = useTheme();
  const profile = useAppSelector(state => state.initial.profileData)
  let profileData = [...profile];
  const userInfo = useAppSelector(state => state.userProfile.userInfo);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  console.log(profile)

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
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={styles.innerContainer}>
        {/* completed */}
        {profileData.map(item => (
            item.isCompleted && <ProfileItemCard key={item.id} name={item.name} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} userInfo={userInfo} />
        ))}
        {/* in progress */}
        {/* {profileData.map(item => (
          item.inProgress && <ProfileItemCard key={item.id} name={item.name} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} userInfo={userInfo} />
        ))} */}
        {/* not completed */}
        {profileData.map(item => (
          !item.isCompleted && <ProfileItemCard key={item.id} name={item.name} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} userInfo={userInfo} />
        ))}
        {/* total */}
        {/* {profileData.map(item => (
          <ProfileItemCard key={item.id} name={item.name} title={item.title} id={item.id} isCompleted={item.isCompleted} handleClick={item.onPress} userInfo={userInfo} />
        ))} */}
      </View>
      {profileData.map(item => {
        if(item.inProgress) {
          return (
            <View key={item.id} style={{flex: 1}}>
              {item.screen}
            </View>
          );
        }
      })}
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
    paddingTop: 20,
    paddingBottom: 100,
    paddingLeft: '10%',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
});

export default CreateProfileLanding;

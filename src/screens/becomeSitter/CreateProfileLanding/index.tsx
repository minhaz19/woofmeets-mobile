import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getUserProfileInfo} from '../../../store/slices/userProfile/userProfileAction';
import {getContactInfo} from '../../../store/slices/profile/contact';
import {getSitterDetails} from '../../../store/slices/profile/details';

const CreateProfileLanding = () => {
  const {colors} = useTheme();
  const profileData = useAppSelector(state => state.initial.profileData);
  const [, setRefreshing] = useState(false);
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
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ScrollView horizontal={true}>
        <View style={styles.innerContainer}>
          {/* completed */}
          {profileData.map(
            (item: any) =>
              item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  inProgress={item.inProgress}
                  handleClick={item.onPress} 
                  isBoarding={false} />
              ),
          )}
          {/* not completed */}
          {profileData.map(
            (item: any) =>
              !item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  inProgress={item.inProgress}
                  handleClick={item.onPress} isBoarding={false} />
              ),
          )}
        </View>
      </ScrollView>
      {profileData.map((item: any) => {
        if (item.inProgress) {
          return (
            <View key={item.id} style={{flex: 32}}>
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
    paddingLeft: '10%',
  },
  innerContainer: {
    flexDirection: 'row',
  },
});

export default CreateProfileLanding;

import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {useAppDispatch} from '../../../store/store';
import {getSitterDetails} from '../../../store/slices/profile/details';
import MyPet from '../../pet/MyPet';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {useNavigation} from '@react-navigation/native';
import {
  setProfileData,
  setSitterData,
} from '../../../store/slices/onBoarding/initial';

const OnboardingMyPetScreen = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getSitterDetails());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

  const handleSubmit = () => {
    dispatch(setProfileData({pass: 4}));
    dispatch(setSitterData({pass: 2}));
  };

  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <MyPet navigation={navigation} onBoarding={true} />
      <View style={styles.footerContainer}>
        <ButtonCom
          title="Save & Continue"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={handleSubmit}
          //   loading={loading}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  footerContainer: {
    paddingHorizontal: '5%',
  },
});

export default OnboardingMyPetScreen;

import {View, StyleSheet} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import HeaderText from '../../../components/common/text/HeaderText';
import TitleText from '../../../components/common/text/TitleText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import { sitterDetailsValidationSchema } from '../../../utils/config/becomeSitter/validationSchema';
import SitterDetailsInput from '../../../components/ScreenComponent/becomeSitter/details/SitterDetailsInput';
import { getSitterDetails, postSitterDetails } from '../../../store/slices/profile/details';
import { useDetailsInitalValue } from './useDetailsInitialValue';
import { setProfileData, setSitterData } from '../../../store/slices/onBoarding/initial';
import AppForm from '../../../components/common/Form/AppForm';
import ScrollViewRapperRefresh from '../../../components/common/ScrollViewRapperRefresh';

const SitterDetails = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const sitterInfo = useAppSelector(state => state.details.sitterInfo?.providerDetails);
  const sitterDetailsSubmit = (sitterData: any) => {
    const method = sitterInfo ? 'patch' : 'post';
    dispatch(postSitterDetails({sitterData, method}));
    dispatch(setProfileData({pass: 2}));
    // new update onboarding
    dispatch(setSitterData({pass: 2}));
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getSitterDetails());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollViewRapperRefresh onRefresh={onRefresh} refreshing={refreshing}>
        <View style={styles.nameContainer}>
            <HeaderText
              text="Create Your Profile"
              textStyle={styles.textStyle}
            />
            <TitleText
              text="Details about your pet-care experience"
              textStyle={styles.titleTextStyle}
            />
            <DescriptionText
              text="Let pet owners know about your personal qualities and overall love of animals"
              textStyle={{...styles.details, color: colors.descriptionText}}
            />
            <DescriptionText
              text="Quick tips:"
              textStyle={styles.details}
            />
          <AppForm
            initialValues={useDetailsInitalValue()}
            validationSchema={sitterDetailsValidationSchema}>
            <SitterDetailsInput handleSubmit={sitterDetailsSubmit} />
          </AppForm>
          </View>
      <BottomSpacing />
    </ScrollViewRapperRefresh>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  footerContainer: {
    paddingHorizontal: '5%',
  },
  nameContainer: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    paddingBottom: 8,
  },
  titleTextStyle: {
    fontWeight: '600',
    paddingBottom: 8,
  },
  details: {
    paddingBottom: 8,
  },
  textInfoContainer: {
    width: '95%',
    paddingLeft: '5%',
  },
  textInputStyle: {},
});

export default SitterDetails;

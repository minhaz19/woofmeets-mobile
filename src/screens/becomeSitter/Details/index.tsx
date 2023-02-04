import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import HeaderText from '../../../components/common/text/HeaderText';
import TitleText from '../../../components/common/text/TitleText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import {sitterDetailsValidationSchema} from '../../../utils/config/becomeSitter/validationSchema';
import SitterDetailsInput from '../../../components/ScreenComponent/becomeSitter/details/SitterDetailsInput';
import {
  getAttributesPreference,
  getSitterDetails,
  getSkillsData,
  getUserDetailsPreference,
  postSitterDetails,
} from '../../../store/slices/profile/details';
import {useDetailsInitialValue} from './useDetailsInitialValue';
import {
  setProfileData,
  setSitterData,
} from '../../../store/slices/onBoarding/initial';
import AppForm from '../../../components/common/Form/AppForm';
import BulletPoints from '../../../components/UI/Points/BulletPoints';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useDetailsUtils} from '../../../components/ScreenComponent/becomeSitter/details/utils/useDetailsUtils';

const SitterDetails = ({route, navigation}) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {sitterInfo, attributes, attributesLoading, skillsLoading, loading} =
    useAppSelector(state => state.details);


  // hooks for get the data
  useDetailsUtils();

  // hooks for initial value
  const {detailsInitialValue} = useDetailsInitialValue();

  // submit button
  const sitterDetailsSubmit = async (sitterData: any) => {
    setIsLoading(true);
    const mtd = sitterInfo ? 'put' : 'post';
    const data = {...sitterData, mtd};
    const homeAttributes = [...data?.ownerAttributes, ...data?.hostAttributes];
    data.homeAttributes = homeAttributes;
    await dispatch(postSitterDetails(data));
    await dispatch(getSitterDetails());
    setIsLoading(false);
    if (route?.name) {
      return navigation.goBack();
    }
    dispatch(setProfileData({pass: 2}));
    // new update onboarding
    dispatch(setSitterData({pass: 2}));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getAttributesPreference());
    await dispatch(getSkillsData());
    await dispatch(getUserDetailsPreference());
    setRefreshing(false);
  };

  return (
    <>
      {attributesLoading || skillsLoading || loading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.backgroundColor}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
            <DescriptionText text="Quick tips:" textStyle={styles.details} />
            <BulletPoints
              textStyle={{color: colors.descriptionText}}
              text={
                'We recommend keeping personal identifiers—like your last name or workplace—out of your profile.'
              }
            />
            <BulletPoints
              textStyle={{color: colors.descriptionText}}
              text={
                'This is a chance to let your potential clients know how much animals mean to you and why you’re the ideal candidate to care for their pets. Be honest about your background with animals, and don’t embellish any of your experiences caring for them.'
              }
            />
            <AppForm
              initialValues={detailsInitialValue}
              validationSchema={sitterDetailsValidationSchema}>
              <SitterDetailsInput
                handleSubmit={sitterDetailsSubmit}
                isLoading={isLoading}
                attributes={attributes}
              />
            </AppForm>
          </View>
          <BottomSpacing />
        </ScrollView>
      )}
    </>
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

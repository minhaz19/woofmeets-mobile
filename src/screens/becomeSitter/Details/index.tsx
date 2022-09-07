import {View, StyleSheet, Text, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../constants/textScaling';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import HeaderText from '../../../components/common/text/HeaderText';
import TitleText from '../../../components/common/text/TitleText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import AppForm from '../../../components/common/Form/AppForm';
import { sitterDetailsValue } from '../../../utils/config/becomeSitter/initalValues';
import { sitterDetailsValidationSchema } from '../../../utils/config/becomeSitter/validationSchema';
import SitterDetailsInput from '../../../components/ScreenComponent/becomeSitter/details/SitterDetailsInput';
import { getSitterDetails, postSitterDetails } from '../../../store/slices/profile/details';
import { useDetailsInitalValue } from './useDetailsInitialValue';

const SitterDetails = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const sitterDetailsSubmit = (sitterData: any) => {
    dispatch(postSitterDetails(sitterData));
  };

  const [refreshing, setRefreshing] = useState(false);
  const {sitterInfo, loading} = useAppSelector(
    state => state.details,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getSitterDetails());
    setRefreshing(false);
  }, [dispatch]);

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
    </ScrollView>
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

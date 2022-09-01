import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import HeaderText from '../../../components/common/text/HeaderText';
import TitleText from '../../../components/common/text/TitleText';
import DescriptionText from '../../../components/common/text/DescriptionText';

const SitterDetails = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const contact = useAppSelector(
    state => state.contact,
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // dispatch(getContactInfo());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {}, [contact.contactInfo]);

  return (
    <ScrollView
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
              textStyle={styles.details}
            />
            <DescriptionText
              text="Quick tips:"
              textStyle={styles.details}
            />
            <TitleText
              text="Years of personal or professional ex-perience caring for pets"
              textStyle={styles.titleTextStyle}
            />
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
});

export default SitterDetails;

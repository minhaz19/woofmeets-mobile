import {View, StyleSheet} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import LandingCard from '../../../components/ScreenComponent/becomeSitter/landingPage';
import Colors from '../../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getUserServices } from '../../../store/slices/profile/services';

const SitterLandingPage = (props: { navigation: { navigate: (arg0: string) => any; }; }) => {
  const {colors} = useTheme();
  const sitterData = useAppSelector(state => state.initial.sitterData);
  const dispatch = useAppDispatch();

  const [, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getUserServices());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={{...styles.innerContainer, borderBottomColor: colors.borderColor}}>
        <View style={styles.leftContainer}>
          {/* completed */}
          {sitterData.map((item: any) => (
            item.isCompleted && !item.inProgress && <LandingCard key={item.id} item={item} />
          ))}
          {/* in progress */}
          <View style={styles.inProgressContainer}>
            <LandingCard item={sitterData.find((item: any) => {
              return item.inProgress === true && item.screen;
            })} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          {/* not completed */}
          {sitterData.map((item: any) => (
            !item.isCompleted && !item.inProgress && <LandingCard key={item.id} item={item} />
          ))}
        </View>
      </View>
      {/* main component screen render */}
      <View style={{flex: 1}}>
        {sitterData.find((item: any) => {
            return item.inProgress === true && item.screen;
        })?.screen}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderBottomWidth: 1,
  },
  footerContainer: {
    width: '90%',
    paddingLeft: '10%',
    paddingTop: 20,
    paddingBottom: 100,
  },
  leftContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  itemContainer: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  inProgressContainer: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: Colors.primary,
  },
});

export default SitterLandingPage;

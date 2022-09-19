/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../store/store';
import ProfileItemCard from '../../../components/ScreenComponent/becomeSitter/createProfile/profileItem';

const ServiceSetUp = () => {
  const {colors} = useTheme();
  const boardingSelection = useAppSelector(
    state => state.initial.boardingSelection,
  );

  return (
    <>
      <View
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <View style={styles.innerContainer}>
          {/* completed */}
          {boardingSelection.map(
            (item: any) =>
              item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                  isBoarding={true}
                />
              ),
          )}
          {/* not completed */}
          {boardingSelection.map(
            (item: any) =>
              !item.isCompleted && (
                <ProfileItemCard
                  key={item.id}
                  name={item.name}
                  title={item.title}
                  id={item.id}
                  isCompleted={item.isCompleted}
                  handleClick={item.onPress}
                  isBoarding={true}
                />
              ),
          )}
        </View>
        {boardingSelection.map((item: any) => {
          if (item.inProgress) {
            return (
              <View key={item.id} style={{flex: 1}}>
                <item.screen />
              </View>
            );
          }
        })}
      </View>
    </>
  );
};

export default ServiceSetUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
});

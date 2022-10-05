import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AppTouchableOpacity from './AppClickEvents/AppTouchableOpacity';
import TitleText from './text/TitleText';
import DescriptionText from './text/DescriptionText';
import {Calendar} from '../../assets/svgs/SVG_LOGOS';
import AppCalendar from './AppCalendar';
import Colors from '../../constants/Colors';
const BottomSheetCalendar = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['75%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <AppTouchableOpacity
          style={styles.sectionContainer}
          onPress={handlePresentModalPress}>
          <View>
            <TitleText textStyle={styles.titleText} text={'Dates'} />
            <DescriptionText text={'Tap to add dates'} />
          </View>
          <View style={styles.iconContainer}>
            <Calendar fill="black" width={30} height={30} />
          </View>
        </AppTouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <AppCalendar />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomSheetCalendar;

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.background,
    borderRadius: 6,
  },

  container: {},
});

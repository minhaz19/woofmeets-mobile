import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import DayTimeSlot from '../../components/ScreenComponent/Appointment/common/DayTimeSlot';
const Appointment = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DayTimeSlot />
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {flex: 1},
});

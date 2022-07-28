import {StyleSheet, View} from 'react-native';
import React from 'react';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';
import PastMessage from './PastMessage';

const Past = () => {
  return (
    <View>
      <FilterByDateAndActivity
        handleActivity={() => {}}
        handleDate={() => {}}
      />
      <PastMessage />
    </View>
  );
};

export default Past;

const styles = StyleSheet.create({});

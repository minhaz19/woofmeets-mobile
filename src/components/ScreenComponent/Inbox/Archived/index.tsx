import {StyleSheet, View} from 'react-native';
import React from 'react';
import ArchivedMessage from './ArchivedMessage';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';

const Archived = () => {
  return (
    <View>
      <FilterByDateAndActivity
        handleActivity={() => {}}
        handleDate={() => {}}
      />
      <ArchivedMessage />
    </View>
  );
};

export default Archived;

const styles = StyleSheet.create({});

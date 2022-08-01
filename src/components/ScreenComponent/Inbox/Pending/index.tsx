import {View} from 'react-native';
import React from 'react';
import PendingMessage from './PendingMessage';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';

const Pending = () => {
  return (
    <View>
      <FilterByDateAndActivity
        handleActivity={() => {}}
        handleDate={() => {}}
      />
      <PendingMessage />
    </View>
  );
};

export default Pending;

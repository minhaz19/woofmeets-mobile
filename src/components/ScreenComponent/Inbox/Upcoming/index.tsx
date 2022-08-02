import {View} from 'react-native';
import React from 'react';
import UpcomingMessage from './UpcomingMessage';
import FilterByDateAndActivity from '../utils/Common/FilterByDateAndActivity';

const Upcoming = () => {
  return (
    <View>
      <FilterByDateAndActivity
        handleActivity={() => {}}
        handleDate={() => {}}
      />
      <UpcomingMessage />
    </View>
  );
};

export default Upcoming;

import {View, Platform} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const BottomSpacing = () => {
  return (
    <View
      style={{
        height:
          SCREEN_WIDTH <= 380
            ? Platform.OS === 'ios'
              ? 80
              : 70
            : Platform.OS === 'ios'
            ? 105
            : 85,
      }}
    />
  );
};

export default BottomSpacing;

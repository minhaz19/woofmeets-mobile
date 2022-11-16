import {Platform,   View} from 'react-native';
import React from 'react';
import { SCREEN_WIDTH} from '../../../constants/WindowSize';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const CalendarSK = () => {

  const {colors} = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ContentLoader
        width={SCREEN_WIDTH}
        height={200}
        backgroundColor={colors.loaderBackground}
        foregroundColor={colors.loaderForeground}
        viewBox={`${
          Platform.OS === 'android' ? 10 : 0
        } 0 ${SCREEN_WIDTH} ${200}`}>
        <Rect x="20" y="0" rx="4" ry="4" width={'50%'} height="25" />
        <Rect
          x="20"
          y="40"
          rx="2"
          ry="2"
          width={SCREEN_WIDTH - 40}
          height="120"
        />
      </ContentLoader>
      <ContentLoader
        width={SCREEN_WIDTH}
        height={350}
        backgroundColor={colors.loaderBackground}
        foregroundColor={colors.loaderForeground}
        viewBox={`${
          Platform.OS === 'android' ? 10 : 0
        } 0 ${SCREEN_WIDTH} ${350}`}>
        <Rect x="20" y="15" rx="4" ry="4" width={'50%'} height="25" />
        <Rect
          x="20"
          y="50"
          rx="2"
          ry="2"
          width={SCREEN_WIDTH - 40}
          height="350"
        />
      </ContentLoader>
    </View>
    // </ScrollView>
  );
};

export default CalendarSK;
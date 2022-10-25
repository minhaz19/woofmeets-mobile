import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Platform, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../constants/WindowSize';

const ServiceTypesLoader = () => {
  const {colors} = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ContentLoader
          speed={1}
          width={SCREEN_WIDTH}
          height={200}
          viewBox={`${Platform.OS === 'android' ? 10 : 30} -20 300 200`}
          backgroundColor={colors.loaderBackground}
          foregroundColor={colors.loaderBackground}>
          <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />

          <Rect
            x={0}
            y={30}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />
          <Rect
            x={SCREEN_WIDTH / 3 - 15}
            y={30}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />
          <Rect
            x={(SCREEN_WIDTH / 3) * 2 - 30}
            y={30}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />

          <Rect
            x={0}
            y={110}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />
          <Rect
            x={SCREEN_WIDTH / 3 - 15}
            y={110}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />
          <Rect
            x={(SCREEN_WIDTH / 3) * 2 - 30}
            y={110}
            rx="10"
            ry="10"
            width={SCREEN_WIDTH / 3 - 25}
            height="70"
          />

          {/* <Rect x={0} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" />
                    <Rect x={SCREEN_WIDTH/3 - 20} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" />
                    <Rect x={SCREEN_WIDTH/3 * 2 - 40} y={190} rx="10" ry="10" width={SCREEN_WIDTH / 3 - 30} height="70" /> */}
        </ContentLoader>
      </View>
    </ScrollView>
  );
};

export default ServiceTypesLoader;

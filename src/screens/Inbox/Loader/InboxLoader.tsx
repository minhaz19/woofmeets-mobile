import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {Platform} from 'react-native';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
const InboxLoader = () => {
  const data = [
    {id: 1, x: 0, y: 40},
    {id: 2, x: 0, y: 200},
    {id: 3, x: 0, y: 360},
    {id: 4, x: 0, y: 520},
    {id: 5, x: 0, y: 680},
    {id: 6, x: 0, y: 840},
    {id: 7, x: 0, y: 1000},
  ];
  const {colors} = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <ContentLoader
          speed={1}
          width={SCREEN_WIDTH}
          height={1280}
          viewBox={`${Platform.OS === 'android' ? 10 : 30} -20 300 1280`}
          backgroundColor={colors.loaderBackground}
          foregroundColor={colors.loaderForeground}>
          <Rect x="0" y="0" rx="4" ry="4" width="100" height="20" />
          {data.map(item => (
            <Rect
              key={item.id}
              x={item.x}
              y={item.y}
              rx="10"
              ry="10"
              width="90%"
              height="140"
            />
          ))}
        </ContentLoader>
      </View>
    </ScrollView>
  );
};

export default InboxLoader;

const styles = StyleSheet.create({});

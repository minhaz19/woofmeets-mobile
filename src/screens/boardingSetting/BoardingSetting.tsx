import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BoardingSettingInfo from '../../components/ScreenComponent/BoardingSetting/BoardingSettingInfo';

const BoardingSetting = () => {
  const {colors} = useTheme();
  const handleSubmit = (e: any) => {
    console.log('values', e);
  };
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <BoardingSettingInfo
        handleSubmit={handleSubmit}
        initialValues={undefined}
        validationSchema={undefined}
      />
    </View>
  );
};

export default BoardingSetting;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});

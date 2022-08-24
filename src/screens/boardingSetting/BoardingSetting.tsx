/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BoardingSettingInfo from '../../components/ScreenComponent/BoardingSetting/BoardingSettingInfo';
import {BoardingSettings} from '../../utils/config/initalValues';
import {BoardingSettingsSchema} from '../../utils/config/validationSchema';
import AppForm from '../../components/common/Form/AppForm';

const BoardingSetting = () => {
  const {colors} = useTheme();
  const handleSubmit = (e: any) => {};
  return (
    <View
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <AppForm
        initialValues={BoardingSettings}
        // onSubmit={handleSubmit}
        validationSchema={BoardingSettingsSchema}>
        <BoardingSettingInfo handleSubmit={handleSubmit} />
      </AppForm>
    </View>
  );
};

export default BoardingSetting;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 20,
  },
});

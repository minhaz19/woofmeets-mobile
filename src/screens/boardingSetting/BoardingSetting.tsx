import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BoardingSettingInfo from '../../components/ScreenComponent/BoardingSetting/BoardingSettingInfo';
import {BoardingSettings} from '../../utils/config/initalValues/initalValues';
import {BoardingSettingsSchema} from '../../utils/config/ValidationSchema/validationSchema';
import AppForm from '../../components/common/Form/AppForm';

const BoardingSetting = () => {
  const {colors} = useTheme();
  const handleSubmit = () => {
    // console.log('submitted', e);
  };
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

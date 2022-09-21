import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import AppForm from '../../../../common/Form/AppForm';
import BackgroundCheckBody from './components/BackgroundCheckBody';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {backgroundCheckInit} from '../../../../../utils/config/initalValues/initalValues';
import {backgroundCheckValidationSchema} from '../../../../../utils/config/ValidationSchema/validationSchema';
import Screen from '../../../../common/Screen';
import BackgroundCheckANI from '../../../../common/LottieAnimations/BackgroundCheckANI';
import {useBasicBackgroundCheck} from './utils/useBasicBackgroundCheck';
interface Props {
  navigation: {
    navigate: (arg1: string, ar2: any) => void;
  };
  route: {
    params: {
      sequence: string;
    };
  };
}
const BasicBackgroundCheck = ({navigation, route}: Props) => {
  const {colors} = useTheme();
  const {loading, handleSubmit} = useBasicBackgroundCheck(route, navigation);
  return (
    <Screen style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <BackgroundCheckANI />
        <AppForm
          initialValues={backgroundCheckInit}
          validationSchema={backgroundCheckValidationSchema}>
          <BackgroundCheckBody handleSubmit={handleSubmit} loading={loading} />
        </AppForm>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 0,
  },
  container: {flex: 1},
  screen: {flex: 1},
});

export default BasicBackgroundCheck;

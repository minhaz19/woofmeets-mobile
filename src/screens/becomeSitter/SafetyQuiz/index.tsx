import {StyleSheet} from 'react-native';
import React from 'react';
import Screen from '../../../components/common/Screen';
import AppForm from '../../../components/common/Form/AppForm';
import SafetyQuizBody from '../../../components/ScreenComponent/SafetyQuiz/SafetyQuizBody';
import {useSafetyQuizInitValues} from './utils/useSafetyQuizInitValues';
import {safetyQuizValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import { setSitterData } from '../../../store/slices/onBoarding/initial';
import { useAppDispatch } from '../../../store/store';

const SafetyQuiz = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setSitterData({pass: 3}));
  };
  return (
    <>
      <Screen
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <AppForm
          initialValues={useSafetyQuizInitValues()}
          validationSchema={safetyQuizValidationSchema}>
          <SafetyQuizBody handleSubmit={handleSubmit} loading={false} />
        </AppForm>
      </Screen>
    </>
  );
};

export default SafetyQuiz;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 20},
});

/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Screen from '../../../components/common/Screen';
import AppForm from '../../../components/common/Form/AppForm';
import SafetyQuizBody from '../../../components/ScreenComponent/SafetyQuiz/SafetyQuizBody';
import {useSafetyQuizInitValues} from './utils/useSafetyQuizInitValues';
import {safetyQuizValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {setSitterData} from '../../../store/slices/onBoarding/initial';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {getSafetyQuiz} from '../../../store/slices/onBoarding/safetyQuiz/satetyQuizAction';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {getWhoAmI} from '../../../store/slices/common/whoAmI/whoAmIAction';

const SafetyQuiz = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.safetyQuiz);
  const {loading: wmiLoading, userId} = useAppSelector(state => state.whoAmI);
  const {loading: BtnLoading, request} = useApi(methods._post);
  const handleSubmit = async () => {
    const result = await request(`/quiz/complete/${userId}`);
    result.ok && dispatch(setSitterData({pass: 3}));
  };
  useEffect(() => {
    dispatch(getSafetyQuiz());
    dispatch(getWhoAmI());
  }, []);
  return (
    <>
      {(loading || wmiLoading) && <AppActivityIndicator visible={true} />}
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
          <SafetyQuizBody handleSubmit={handleSubmit} loading={BtnLoading} />
        </AppForm>
      </Screen>
    </>
  );
};

export default SafetyQuiz;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 20},
});

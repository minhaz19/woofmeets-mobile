/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import SafetyQuizComplete from '../../../components/ScreenComponent/SafetyQuiz/SafetyQuizComplete';
import TitleText from '../../../components/common/text/TitleText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';

const SafetyQuiz = () => {
  const [completeStatus, setCompleteStatus] = useState(null);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.safetyQuiz);
  const {loading: wmiLoading, userId} = useAppSelector(state => state.whoAmI);
  const {sitterData} = useAppSelector(state => state.initial);
  const {loading: BtnLoading, request} = useApi(methods._post);

  const handleSubmit = async () => {
    // const result = await request(`/quiz/complete/${userId}`);
    // result.ok && dispatch(setSitterData({pass: 3}));
  };
  useEffect(() => {
    dispatch(getSafetyQuiz());
    // dispatch(getWhoAmI());

    const status = sitterData?.find(
      (item: {name: string}) => item.name === 'safetyQuiz',
    );
    setCompleteStatus(status.isCompleted);
  }, []);
  return (
    <>
      {(loading || wmiLoading) && <AppActivityIndicator visible={true} />}

      {completeStatus === null ? (
        <View style={styles.loaderContainer}>
          <TitleText textStyle={styles.loader} text={'Loading...'} />
        </View>
      ) : completeStatus ? (
        <SafetyQuizComplete />
      ) : (
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <AppForm
            initialValues={useSafetyQuizInitValues()}
            validationSchema={safetyQuizValidationSchema}>
            <SafetyQuizBody />
          </AppForm>
        </View>
      )}
    </>
  );
};

export default SafetyQuiz;

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: SCREEN_WIDTH > 800 ? '10%' : 20},
  loader: {
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: Text_Size.Text_5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

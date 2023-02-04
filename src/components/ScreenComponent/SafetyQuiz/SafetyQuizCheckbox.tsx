/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../common/text/TitleText';
import DescriptionText from '../../common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
// import {safetyQuizData} from '../../../utils/config/Data/safetyQuizData';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useFormContext} from 'react-hook-form';
import ButtonCom from '../../UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {setSitterData} from '../../../store/slices/onBoarding/initial';
interface Props {
  control: any;
  errors: any;
  setValue: (arg0: string, arg1: any, arg2: any) => void;
}
const SafetyQuizCheckbox = ({control, setValue, errors}: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState(false);
  const {quiz} = useAppSelector(state => state.safetyQuiz);
  const bb = quiz?.map((item: any, index: number) => ({
    id: index + 1,
    title: item.question,
    answer: item.answer,
    checkbox: item.options,
  }));
  const {getValues} = useFormContext();
  const data = getValues();
  const dispatch = useAppDispatch();
  const {userId} = useAppSelector(state => state.whoAmI);
  const {loading: BtnLoading, request} = useApi(methods._post);

  const item = bb && bb[currentQuestionIndex];
  const handleNext = async (answer: any) => {
    if (answer === bb[currentQuestionIndex]?.answer) {
      if (bb?.length - 1 === currentQuestionIndex) {
        const result = await request(`/quiz/complete/${userId}`);
        result.ok && dispatch(setSitterData({pass: 3}));

        setError(false);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setError(false);
      }
    } else {
      setError(true);
    }
  };
  return (
    <View
      style={
        {
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 5,
          // backgroundColor: 'red',
        }
      }>
      <View
        style={{
          alignSelf: 'flex-end',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: Colors.lightShade,
          borderRadius: 6,
          marginTop: 5,
          // marginRight: 10,
        }}>
        <TitleText
          text={` Question: ${currentQuestionIndex + 1} of ${bb?.length}`}
          textStyle={{
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        />
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
        <View style={styles.textContainer}>
          <View style={styles.iconWarper}>
            <DescriptionText
              textStyle={styles.text}
              text={item?.id.toString()}
            />
          </View>
          <TitleText textStyle={styles.titleText} text={item?.title} />
        </View>

        <View style={styles.additionalTypeContainer}>
          {item?.checkbox.map(
            (type: {key: string; text: string}, key: number) => (
              <AppCheckboxField
                title={type.text}
                radio
                small
                key={key}
                typeValue={type.key + currentQuestionIndex}
                errors={false}
                control={control}
                onPress={() => {
                  setSelectedAnswer(type.key);
                  setValue(
                    item?.id.toString(),
                    type.key + currentQuestionIndex,
                    {
                      shouldValidate:
                        item?.answer + currentQuestionIndex ===
                        type.key + currentQuestionIndex
                          ? true
                          : false,
                    },
                  );
                }}
                name={item?.id.toString()}
              />
            ),
          )}
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <TitleText
              textStyle={styles.errorText}
              text={'Please select the corrent answer'}
            />
          </View>
        )}
      </View>

      <View
        style={[
          styles.buttonCon,
          {
            width: bb?.length - 1 === currentQuestionIndex ? '60%' : '30%',
          },
        ]}>
        <ButtonCom
          title={
            bb?.length - 1 === currentQuestionIndex ? 'Save & Continue' : 'Next'
          }
          loading={BtnLoading}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => handleNext(selectedAnswer)}
        />
      </View>
    </View>
  );
};

export default SafetyQuizCheckbox;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  iconWarper: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
  },
  text: {color: Colors.primary, fontWeight: 'bold'},
  titleText: {flex: 1, fontSize: Text_Size.Text_0, fontWeight: '500'},
  additionalTypeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    marginLeft: 40,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  errorContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: Colors.red,
  },
  buttonCon: {alignSelf: 'flex-end', marginTop: 20},
});

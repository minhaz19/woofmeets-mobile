/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../common/text/TitleText';
import DescriptionText from '../../common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
// import {safetyQuizData} from '../../../utils/config/Data/safetyQuizData';
import {useAppSelector} from '../../../store/store';
import {useFormContext} from 'react-hook-form';
interface Props {
  control: any;
  errors: any;
  setValue: (arg0: string, arg1: any, arg2: any) => void;
}
const SafetyQuizCheckbox = ({control, setValue, errors}: Props) => {
  const {quiz} = useAppSelector(state => state.safetyQuiz);
  const bb = quiz?.map((item: any, index: number) => ({
    id: index + 1,
    title: item.question,
    answer: item.answer,
    checkbox: item.options,
  }));
  const {getValues} = useFormContext();
  const data = getValues();
  return (
    <View>
      {bb?.map(
        (
          item: {title: string; id: number; checkbox: []; answer: string},
          index: number,
        ) => (
          <View key={index}>
            <View style={styles.textContainer}>
              <View style={styles.iconWarper}>
                <DescriptionText
                  textStyle={styles.text}
                  text={item.id.toString()}
                />
              </View>
              <TitleText textStyle={styles.titleText} text={item.title} />
            </View>
            <View style={styles.additionalTypeContainer}>
              {item.checkbox.map(
                (type: {key: string; text: string}, key: number) => (
                  <AppCheckboxField
                    title={type.text}
                    radio
                    small
                    key={key}
                    typeValue={type.key + index}
                    errors={false}
                    control={control}
                    onPress={() => {
                      setValue(item.id.toString(), type.key + index, {
                        shouldValidate:
                          item.answer + index === type.key + index
                            ? true
                            : false,
                      });
                    }}
                    name={item.id.toString()}
                  />
                ),
              )}
            </View>
            {item.answer + index !== data[`${index + 1}`] && (
              <View style={styles.errorContainer}>
                <TitleText
                  textStyle={styles.errorText}
                  text={'Please select the corrent answer'}
                />
              </View>
            )}
          </View>
        ),
      )}
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
});

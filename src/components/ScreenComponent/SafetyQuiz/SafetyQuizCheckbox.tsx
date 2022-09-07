/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleText from '../../common/text/TitleText';
import DescriptionText from '../../common/text/DescriptionText';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import AppCheckboxField from '../../common/Form/AppCheckboxField';
import {safetyQuizData} from '../../../utils/config/Data/safetyQuizData';
interface Props {
  control: any;
  errors: any;
  setValue: (arg0: string, arg1: any) => void;
}
const SafetyQuizCheckbox = ({control, setValue, errors}: Props) => {
  return (
    <View>
      {safetyQuizData.map((item, index) => (
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
            {item.checkbox.map((type, key) => (
              <AppCheckboxField
                title={type.label}
                radio
                small
                key={key}
                typeValue={type.value}
                errors={errors}
                control={control}
                onPress={() => {
                  setValue(item.name, type.value);
                }}
                name={item.name}
              />
            ))}
          </View>
        </View>
      ))}
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
});

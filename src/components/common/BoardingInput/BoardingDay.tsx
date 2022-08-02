import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Text_Size from '../../../constants/textScaling';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {FormikValues, useFormikContext} from 'formik';
import ErrorMessage from '../Form/ErrorMessage';
import Colors from '../../../constants/Colors';

interface Props {
  title: string;
  name: string;
  typeKey: number;
  onPress: () => void;
  active: boolean;
}

const BoardingDay: FC<Props> = ({title, name, typeKey, onPress, active}) => {
  const {colors} = useTheme();
  const [checkSq, setCheckSq] = useState(false);
  const {setFieldValue, errors, touched, setFieldTouched} =
    useFormikContext<FormikValues>();
  const handleValues = () => {
    setFieldValue(name, typeKey);
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setCheckSq(!checkSq);
          handleValues();
          onPress();
        }}
        onBlur={() => setFieldTouched(name)}>
        <View
          style={[
            styles.container,
            active
              ? {
                  borderColor: Colors.primary,
                  backgroundColor: colors.backgroundColor,
                }
              : {
                  backgroundColor: colors.backgroundColor,
                  borderColor: Colors.gray,
                },
          ]}>
          <Text style={[styles.text, {color: colors.descriptionText}]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default BoardingDay;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  afterSelectContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
});

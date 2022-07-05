import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import ErrorMessage from './Form/ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
interface Props {
  name: string;
  terms?: boolean;
}
const AppSwitch = ({name, terms}: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {touched, values, errors, setFieldValue} =
    useFormikContext<FormikValues>();
  console.log('toggle', values[name], errors[name]);
  return (
    <>
      <View style={styles.container}>
        {terms && (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Agree to </Text>
            <TouchableOpacity>
              <Text style={styles.link}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View>
        )}
        <Switch
          trackColor={{false: Colors.primaryLight, true: Colors.primaryLight}}
          thumbColor={isEnabled ? Colors.primary : '#f4f3f4'}
          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
          ios_backgroundColor={Colors.primary}
          onValueChange={() => {
            setIsEnabled(!isEnabled);
            setFieldValue(name, !isEnabled);
          }}
          value={values[name]}
        />
      </View>
      <View>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
};

export default AppSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  link: {
    color: Colors.primary,
    fontSize: Text_Size.Text_0,
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
});

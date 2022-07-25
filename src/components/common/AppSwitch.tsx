import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import ErrorMessage from './Form/ErrorMessage';
import {FormikValues, useFormikContext} from 'formik';
import SwitchView from './switch/SwitchView';
import ShortText from './text/ShortText';
interface Props {
  name: string;
  terms?: boolean;
  auth?: boolean;
}
const AppSwitch = ({name, terms, auth}: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {touched, values, errors, setFieldValue} =
    useFormikContext<FormikValues>();
  return (
    <>
      <View style={styles.container}>
        {terms && (
          <View style={styles.textContainer}>
            <ShortText textStyle={styles.text} text="Agree to" />
            <TouchableOpacity>
              <ShortText textStyle={styles.link} text="Terms and Conditions" />
            </TouchableOpacity>
          </View>
        )}
        <SwitchView
          isActive={values[name]}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsEnabled(is);
            setFieldValue(name, !isEnabled);
          }}
        />
      </View>
      <View style={styles.errorCont}>
        <ErrorMessage
          auth={auth}
          error={errors[name]}
          visible={touched[name]}
        />
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
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: Text_Size.Text_0,
    marginRight: 3,
  },
  errorCont: {marginTop: 8},
});

import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import ErrorMessage from './Form/ErrorMessage';
import SwitchView from './switch/SwitchView';
import ShortText from './text/ShortText';
import {useRHFContext} from '../../utils/helpers/Form/useRHFContext';
import { useTheme } from '../../constants/theme/hooks/useTheme';
interface Props {
  name: string;
  terms?: boolean;
  auth?: boolean;
  title?: string;
  active?: boolean;
  onPress?: () => void;
}
const AppSwitch = ({name, terms, auth, title}: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {isDarkMode} = useTheme()

  const {errors, value, setValue} = useRHFContext(name);
  return (
    <>
      <View style={styles.container}>
        {terms && (
          <View style={styles.textContainer}>
            <ShortText textStyle={styles.text} text="Agree to" />
            <TouchableOpacity onPress={() => Linking.openURL('https://woofmeets.com/terms-and-conditions')}>
              <ShortText textStyle={{...styles.link, color: Colors.blue}} text="Terms and Conditions" />
            </TouchableOpacity>
          </View>
        )}
        {title && <ShortText text={title} textStyle={styles.title} />}
        <SwitchView
          isActive={value}
          activeText=""
          inActiveText=""
          onSelect={is => {
            setIsEnabled(is);
            setValue(name, !isEnabled, {shouldValidate: true});
          }}
        />
      </View>
      <View style={styles.errorCont}>
        <ErrorMessage auth={auth} error={errors[name]?.message} />
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
  title: {
    fontSize: Text_Size.Text_0,
  },
  link: {
    fontSize: Text_Size.Text_0,
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: Text_Size.Text_0,
    marginRight: 3,
  },
  errorCont: {marginTop: 8},
});

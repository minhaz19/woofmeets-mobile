import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import AppButton from '../../../common/AppButton';
import ButtonCom from '../../../UI/ButtonCom';
import {style} from './style';

interface VerifyCodeProps {
  resendCode: any;
  loading: boolean;
  onPress: (arg1: any) => void;
  handleClose: () => void;
}
const CELL_COUNT = 6;

export const VerifyCode: React.FC<VerifyCodeProps> = ({
  resendCode,
  loading,
  onPress,
  handleClose,
}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={style.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={style.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[style.cellRoot, isFocused && style.focusCell]}>
            <Text style={style.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <View style={{paddingTop: 20}}>
        <ButtonCom
          title={'Continue'}
          onSelect={() => onPress({code: value})}
          loading={loading}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.flex}>
          <AppButton title={'Close'} onPress={handleClose} />
        </View>
        <View style={styles.flex}>
          <AppButton title={'Resend Code'} onPress={resendCode} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex: {justifyContent: 'center', flex: 1},
});

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View ,TouchableOpacity} from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 
'react-native-confirmation-code-field';
import AppButton from '../../../common/AppButton';
import SubmitButton from '../../../common/Form/SubmitButton';
import { style } from './style';

interface VerifyCodeProps {
}
const CELL_COUNT = 6;
const RESEND_OTP_TIME_LIMIT = 90;

export const VerifyCode: React.FC<VerifyCodeProps> = ({resendCode, onPress}) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
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
                renderCell={({ index, symbol, isFocused }) => (
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
            <SubmitButton
                title={'Continue'}
                onPress={() => onPress({code: value})}
                // loading={loading}
            />
            </View>
            <AppButton
                title={'Resend Code'}
                onPress={resendCode}
            />
        </SafeAreaView >
    );
}
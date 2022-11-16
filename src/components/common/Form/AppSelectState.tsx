/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {StyleSheet, View, Pressable, TextInput} from 'react-native';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import TitleText from '../text/TitleText';
import {ArrowRight} from '../../../assets/svgs/Services_SVG';
import {Controller} from 'react-hook-form';
import ErrorMessage from './ErrorMessage';
interface Props {
  placeholder: string;
  setOpenDropDown: (arg0: any) => void;
  label: string;
  isState?: any;
  dropVisible: boolean;
  control: any;
  name: string;
  errors?: any;
}

const AppSelectState = ({
  placeholder,
  setOpenDropDown,
  label,
  isState,
  dropVisible,
  control,
  errors,
  name,
}: Props) => {
  const {isDarkMode, colors} = useTheme();
  return (
    <>
      <TitleText textStyle={styles.label} text={label} />
      <Controller
        control={control}
        render={({field: {onBlur, value}, fieldState: {error}}) => {
          return (
            <>
              <Pressable
                onPress={setOpenDropDown}
                onBlur={onBlur}
                style={[
                  styles.container,
                  {
                    backgroundColor: colors.backgroundColor,
                    borderColor: Colors.border,
                  },
                ]}>
                <View pointerEvents="none">
                  <TextInput
                    placeholderTextColor={Colors.gray}
                    placeholder={placeholder}
                    style={[
                      styles.text,
                      {
                        alignSelf: 'flex-start',
                        height: 40,
                        flex: 1,
                        color: Colors.black,
                      },
                    ]}
                    value={value}
                  />
                </View>
                <View style={dropVisible && {transform: [{rotate: '90deg'}]}}>
                  <ArrowRight height={14} width={14} />
                </View>
              </Pressable>
              {error?.message && <ErrorMessage error={error?.message} />}
            </>
          );
        }}
        name={name}
      />
    </>
  );
};

export default memo(AppSelectState);
const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    fontSize: Text_Size.Text_11,
  },
});

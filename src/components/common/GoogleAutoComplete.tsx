import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import TitleText from './text/TitleText';

interface Props {
  onPressAddress: (data: any, details: any) => void;
  label?: string;
  placeholder: string;
  value?: any;
}

const GoogleAutoComplete = ({
  onPressAddress,
  label,
  placeholder,
  // value,
}: Props) => {
  const {colors, isDarkMode} = useTheme();
  return (
    <View>
      {label && <TitleText textStyle={styles.label} text={label} />}
      <GooglePlacesAutocomplete
        // ref={ref => {
        //   ref?.setAddressText(value);
        // }}
        // listViewDisplayed={false}
        placeholder={placeholder}
        textInputProps={{
          placeholderTextColor: Colors.light.subText,
          returnKeyType: "search"
        }}
        onPress={onPressAddress}
        query={{
          key: 'AIzaSyBfNC-SGgbvOOFj9FqoA6HQhrCh_hq5Zo0',
          // components: ':us',
        }}
        fetchDetails={true}
        onFail={() => {}}
        onNotFound={() => {}}
        keyboardShouldPersistTaps={'always'}
        keepResultsAfterBlur={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 0,
          },
          description: {
            color: colors.headerText,
            fontSize: Text_Size.Text_8,
          },
          textInput: {
            backgroundColor: Colors.light.background,
            // height: 42,
            borderRadius: 1,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: Text_Size.Text_9,
            borderColor: colors.borderColor,
            borderWidth: 1,
            flex: 1,
            color: colors.headerText,
          },
          predefinedPlacesDescription: {
            color: colors.headerText,
          },
          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: '#c8c7cc',
            borderTopWidth: 0.5,

            backgroundColor: Colors.light.background,
          },
          row: {
            backgroundColor: Colors.light.background,
            padding: 13,
            // height: 44,

            flexDirection: 'row',
          },
        }}
      />
    </View>
  );
};

export default GoogleAutoComplete;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
});

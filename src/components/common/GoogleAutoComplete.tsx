import {StyleSheet, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import Colors from '../../constants/Colors';
import Text_Size from '../../constants/textScaling';
import {useAppSelector} from '../../store/store';
import TitleText from './text/TitleText';

interface Props {
  onPressAddress: (data: any, details: any) => void;
  label?: string;
  placeholder: string;
}

const GoogleAutoComplete = ({onPressAddress, label, placeholder}: Props) => {
  const {colors, isDarkMode} = useTheme();
  const {userInfo} = useAppSelector(state => state.userProfile);
  return (
    <View>
      {label && <TitleText textStyle={styles.label} text={label} />}
      <GooglePlacesAutocomplete
        // ref={ref => {
        //   ref?.setAddressText('hello world');
        // }}
        placeholder={
          userInfo?.basicInfo?.addressLine1
            ? userInfo?.basicInfo?.addressLine1
            : placeholder
        }
        onPress={onPressAddress}
        query={{key: 'AIzaSyCfhL0D8h89t_m4xilQ-Nb8rlVpzXqAjdo'}}
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
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.background,
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

            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.background,
          },
          row: {
            backgroundColor: isDarkMode
              ? Colors.dark.background
              : Colors.light.background,
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

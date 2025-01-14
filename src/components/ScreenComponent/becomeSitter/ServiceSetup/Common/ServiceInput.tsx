/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TextInput, View} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import ShortText from '../../../../common/text/ShortText';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import changeTextLetter from '../../../../common/changeTextLetter';
import {useAppSelector} from '../../../../../store/store';

const ServiceInput = ({...otherProps}) => {
  const {colors} = useTheme();
  const {user} = useAppSelector(state => state.whoAmI);
  const currencyCode = user?.basicInfo?.country?.currencyCode;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rootContainer}>
        <View
          style={[
            styles.container,
            {
              borderColor: Colors.border,
              backgroundColor: otherProps.editable
                ? colors.backgroundColor
                : colors.borderColor,
            },
          ]}>
          <TitleText
            text={
              currencyCode === null ||
              currencyCode === undefined ||
              currencyCode === 'usd'
                ? '$'
                : 'C$'
            }
            textStyle={{...styles.headerText}}
          />
          <TextInput
            style={[
              styles.text,
              {
                flex: 1,
                color: 'black',
              },
            ]}
            {...otherProps}
          />
        </View>
        <TitleText
          text={changeTextLetter(`/ ${otherProps.unit}`)}
          textStyle={{...styles.headerText}}
        />
      </View>
      {!otherProps.icon ? (
        <ShortText
          textStyle={styles.label}
          text={`You will earn per service: ${
            currencyCode === null ||
            currencyCode === undefined ||
            currencyCode === 'usd'
              ? '$'
              : 'C$'
          }${otherProps.value}`}
        />
      ) : (
        <ShortText
          textStyle={styles.label}
          text={`You keep: ${
            currencyCode === null ||
            currencyCode === undefined ||
            currencyCode === 'usd'
              ? '$'
              : 'C$'
          }${otherProps.value}`}
        />
      )}
    </View>
  );
};

export default memo(ServiceInput);

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    width: SCREEN_WIDTH <= 380 ? '50%' : SCREEN_WIDTH <= 600 ? '70%' : '30%',
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center',
  },
  text: {
    height: 40,
    flex: 0,
    textAlign: 'right',
    fontFamily: 'Muli',
    fontSize: Text_Size.Text_11,
  },
  headerText: {
    paddingHorizontal: 5,
    fontWeight: '400',
    color: Colors.gray,
  },
  label: {},
  mainContainer: {
    marginBottom: 10,
  },
});

import { View, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/WindowSize';
import HeaderText from '../../components/common/text/HeaderText';
import { useTheme } from '../../constants/theme/hooks/useTheme';
import IOSButton from '../../components/UI/IOSButton';
import Text_Size from '../../constants/textScaling';
import Colors from '../../constants/Colors';
import { PromoIcon } from '../../assets/svgs/Misc_LOGOS';

const PromoGiftCodes = () => {
  const {colors} = useTheme();
  const [giftCode, setGiftCode] = useState<string>();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]} >
      <View style={styles.SvgContainer}>
        <PromoIcon />
      </View>
      <View style={styles.textContainer}>
        <HeaderText text="Add promo or gift code" textStyle={styles.headerText} />
        <TextInput
                placeholder="Enter Promo code"
                value={giftCode}
                onChangeText={pCode => setGiftCode(pCode)}
                style={[styles._input, {color: colors.headerText}]}
              />
        <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={() => {}}
            textAlignment={{
              backgroundColor: colors.backgroundColor,
              borderColor: Colors.blue,
              borderWidth: 1,
              borderRadius: 100,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            titleStyle={{
              color: Colors.blue,
            }}
            title={'Apply'}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
    fontFamily: 'Muli',
    fontSize: Text_Size.Text_11,
  },
    SvgContainer: {
      alignItems: 'center',
      paddingTop: '10%',
    },
    textContainer: {
      width: '90%',
      paddingLeft: '5%',
      paddingTop: '10%',
    },
    headerText: {
      lineHeight: 20,
    },
    textStyle: {
      lineHeight: 20,
      marginTop:
        SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
    },
    containerStyleSmall: {
      height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.035 : 40,
      marginLeft: 0,
      marginRight: 0,
      justifyContent: 'center',
      marginTop: '15%',
    },
  });

export default PromoGiftCodes;

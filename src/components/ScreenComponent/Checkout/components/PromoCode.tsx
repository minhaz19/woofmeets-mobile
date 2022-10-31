import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../common/text/BigText';
import {TextInput} from 'react-native-gesture-handler';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState<string>();
  const {colors} = useTheme();
  return (
    <View>
      {/* Promo Code */}
      <BigText text="Enter Promo code" textStyle={styles.textPadding} />
      <View style={styles.promoContainer}>
        <View style={styles.widthTextBox}>
          <TextInput
            placeholder="Enter zip code"
            value={promoCode}
            onChangeText={pCode => setPromoCode(pCode)}
            style={[styles._input, {color: colors.headerText}]}
          />
        </View>
        <AppTouchableOpacity style={styles.widthApply}>
          <HeaderText text="Apply" textStyle={styles.applyText} />
        </AppTouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCode;

const styles = StyleSheet.create({
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  widthApply: {
    width: '20%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 45 : 50,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    color: 'white',
  },
  widthTextBox: {
    width: '80%',
  },
  textPadding: {
    paddingVertical: 5,
  },
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 45 : 50,
    fontFamily: 'Muli',
    fontSize: Text_Size.Text_11,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
});

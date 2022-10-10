/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import Text_Size from '../../../../constants/textScaling';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import AnimatedLottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
type StackParamList = {
  AddCardForm: {foo: string; onBar: () => void} | undefined;
};
interface Props {
  sequence: null | number;
}
type NavigationProps = StackNavigationProp<StackParamList>;

const NoCards = ({sequence}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  console.log('no cards');
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View>
        <AnimatedLottieView
          autoPlay
          loop
          source={require('../../../../assets/cardelement.json')}
          style={styles.loaderStyle}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 50,
          }}>
          <TitleText
            text={'Welcome to payment method'}
            textStyle={{fontSize: Text_Size.Text_3, fontWeight: 'bold'}}
          />
          <DescriptionText
            textStyle={{textAlign: 'center', marginTop: 10}}
            text={'Add your cards for future payment and make your life easier'}
          />
          <AppTouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate('AddCardForm', {sequence: sequence})
            }
            style={{
              backgroundColor: '#028FE7',
              width: '100%',
              borderRadius: 100,
              paddingVertical: 8,
              marginTop: 30,
              marginBottom: 130,
            }}>
            <TitleText
              textStyle={{
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontSize: Text_Size.Text_1,
              }}
              text={'Continue'}
            />
          </AppTouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NoCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  loaderStyle: {width: '90%'},
});

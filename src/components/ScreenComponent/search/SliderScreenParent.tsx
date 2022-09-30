import {
  ImageBackground,
  StyleSheet,
  View,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import DescriptionText from '../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {Cross} from '../../../assets/svgs/SVG_LOGOS';
import {useNavigation} from '@react-navigation/native';
import Screen from '../../common/Screen';

interface Props {
  children: any;
}

const SliderScreenParent = ({children}: Props) => {
  const {colors, isDarkMode} = useTheme();

  const navigation = useNavigation();
  return (
    <Screen style={{flex: 1}}>
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View
        style={[
          styles.rootContainer,
          {
            backgroundColor: Colors.primary,
          },
        ]}>
        <ImageBackground
          source={require('../../../assets/image/pet/searchBackground.png')}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}>
          {/* <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.crossContainer}>
            <View>
              <Cross height={20} width={20} fill={Colors.light.background} />
            </View>
          </Pressable> */}
          <View style={styles.childrenContainer}>{children}</View>
        </ImageBackground>
      </View>

      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: isDarkMode ? Colors.subText : Colors.primary},
        ]}>
        <Pressable onPress={() => navigation.goBack()}>
          <DescriptionText text={'Book Now'} textStyle={styles.description} />
        </Pressable>
      </View>
    </View>
    </Screen>
  );
};

export default SliderScreenParent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
  },
  imageContainer: {height: '100%', width: '100%', justifyContent: 'center'},
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '10%' : '5%',
    width: '60%',
  },
  description: {
    paddingVertical: 6,
    color: Colors.light.background,
    alignSelf: 'center',
  },
  crossContainer: {
    right: 10,
    top: Platform.OS === 'ios' ? 30 : 15,
    position: 'absolute',
    flex: 2,
    // backgroundColor: Colors.light.background,
    padding: 10,
  },
  childrenContainer: {
    margin: '5%',
  },
});

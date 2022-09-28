import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';
import DescriptionText from '../../common/text/DescriptionText';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {Cross} from '../../../assets/svgs/SVG_LOGOS';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: any;
}

const SliderScreenParent = ({children}: Props) => {
  const {colors, isDarkMode} = useTheme();

  const navigation = useNavigation();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.rootContainer}>
        <ImageBackground
          source={require('../../../assets/image/pet/searchBackground.png')}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}>
          {/* <TouchableHighlight onPress={() => {
            console.log('pressed')
            navigation.goBack()}}
            style={styles.crossContainer}>
            <View >
              <Cross height={20} width={20} fill={Colors.light.background} />
            </View>
          </TouchableHighlight> */}
          <View style={styles.childrenContainer}>{children}</View>
        </ImageBackground>
      </View>

      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: isDarkMode ? Colors.subText : Colors.primary},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <DescriptionText text={'Book Now'} textStyle={styles.description} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SliderScreenParent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rootContainer: {
    backgroundColor: Colors.primary,
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
    right: 20,
    top: 50,
    position: 'absolute',
    flex: 2,
    backgroundColor: 'black',
    padding: 10,
  },
  childrenContainer: {
    margin: '5%',
  },
});

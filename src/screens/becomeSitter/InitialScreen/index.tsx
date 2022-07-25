import {View, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import HeaderText from '../../../components/common/text/HeaderText';

const SitterInitialScreen = () => {
  const {colors} = useTheme();
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://picsum.photos/800'}}
          style={styles.image}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.centerText}>
          <BigText text="Get paid to play with pets" />
        </View>
        <TitleText text="Woofmeets makes it easy and promotes you to the nation's largest network of pet owners. Earn money doing something you love." />
        <ButtonCom
          title="Get Started"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
        <HeaderText text="Flexibility puts you in Control" />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://picsum.photos/800'}}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '2%',
  },
  imageContainer: {
    width: '100%',
    height: SCREEN_WIDTH >= 800 ? 260 : 200,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {width: '100%', height: '100%'},
  innerContainer: {
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '4%',
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SitterInitialScreen;

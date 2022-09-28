/* eslint-disable react-hooks/exhaustive-deps */
import {View, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import HeaderText from '../../../components/common/text/HeaderText';
import BulletPoints from '../../../components/UI/Points/BulletPoints';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import CardQuotes from '../../../components/ScreenComponent/becomeSitter/Card/CardQuotes';
import HowItWorks from '../../../components/ScreenComponent/becomeSitter/works/HowItWorks';
import {bulletData1, bulletData2, bulletData3} from './data';
import {styles} from './styles';
import {getOnboardingProgress} from '../../../store/slices/onBoarding/initial';
import {useAppDispatch} from '../../../store/store';

const SitterInitialScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  useEffect(() => {
    dispatch(getOnboardingProgress());
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <View style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
        <Image
          source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
          style={styles.image}
        />
      </View>
      {/* GET PAID */}
      <View style={styles.innerContainer}>
        <View style={styles.centerText}>
          <BigText text="Get paid to play with pets" />
        </View>
        <View style={styles.verticalPadding}>
          <TitleText
            textStyle={styles.titleStyleMedium}
            text="Woofmeets makes it easy and promotes you to the nation's largest network of pet owners. Earn money doing something you love."
          />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonCom
            title="Get Started"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => props.navigation.navigate('SitterLandingPage')}
          />
        </View>
        {/* Flexibility */}
        <HeaderText
          textStyle={styles.titleStylePadding}
          text="Flexibility puts you in Control"
        />
        {/* Bullets */}
        {bulletData1.map(item => (
          <BulletPoints text={item.text} key={item.id} />
        ))}
      </View>
      <View style={styles.verticalPadding} />
      <View style={styles.verticalPadding} />
      {/* Image Quotes 1 */}
      <View style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
        <Image
          source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
          style={styles.image}
        />
      </View>
      <CardQuotes
        comment="It's easy . I go to the calendar and mark myself as available when I want to be ."
        writter="Cari C ., Plano TX"
      />
      {/* Tools to success */}
      <View style={styles.innerContainer}>
        <HeaderText
          textStyle={styles.titleStylePadding2}
          text="The tools to succeed"
        />
        {bulletData2.map(item => (
          <BulletPoints text={item.text} key={item.id} />
        ))}
      </View>
      <View style={styles.verticalPadding} />
      {/* Image Quotes 2 */}
      <View style={[styles.imageContainer, {borderColor: colors.borderColor}]}>
        <Image
          source={{uri: 'https://source.unsplash.com/random/800x800/?img=1'}}
          style={styles.image}
        />
      </View>
      <CardQuotes
        comment="Thanks to the Woofmeets App, I know about mu business requests immediately and I'm quick to respond!"
        writter="Carol U., Atlanta GA"
      />
      {/* How it works */}
      <View style={styles.innerContainer}>
        <HeaderText textStyle={styles.titleStylePadding2} text="How it Works" />
        <HowItWorks />
        <View style={styles.buttonContainer}>
          <ButtonCom
            title="Get Started"
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => props.navigation.navigate('SitterLandingPage')}
          />
        </View>
      </View>
      {/* Safety First */}
      <View style={styles.innerContainer}>
        <HeaderText
          textStyle={styles.titleStyle}
          text="Safety first. Always."
        />
        <TitleText
          textStyle={styles.titleStylePaddingMedium}
          text="We work tirelessly to ensure tails keep wagging and pet owner's minds are at ease."
        />
        {bulletData3.map(item => (
          <BulletPoints text={item.text} key={item.id} />
        ))}
      </View>
      {/* Footer */}
      <View style={[styles.centerText, styles.innerContainer]}>
        <BigText
          textStyle={styles.titleStylePadding}
          text="Connect with pet owners once your profile is approved"
        />
      </View>
      <View style={[styles.buttonContainer, styles.innerContainer]}>
        <ButtonCom
          title="Start Creating Your Profile"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => props.navigation.navigate('SitterLandingPage')}
        />
      </View>
      <BottomSpacing />
    </ScrollView>
  );
};

export default SitterInitialScreen;

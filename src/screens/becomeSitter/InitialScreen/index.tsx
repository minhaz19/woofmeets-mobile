import {View, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import BigText from '../../../components/common/text/BigText';
import TitleText from '../../../components/common/text/TitleText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import HeaderText from '../../../components/common/text/HeaderText';
import BulletPoints from '../../../components/UI/Points/BulletPoints';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import CardQuotes from '../../../components/ScreenComponent/becomeSitter/Card/CardQuotes';
import ServicesCom from '../../../components/ScreenComponent/becomeSitter/works/ServicesCom';
import HowItWorks from '../../../components/ScreenComponent/becomeSitter/works/HowItWorks';

const SitterInitialScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
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
            onSelect={() => props.navigation.navigate('HomeProfile')}
          />
        </View>
        {/* Flexibility */}
        <HeaderText
          textStyle={styles.titleStylePadding}
          text="Flexibility puts you in Control"
        />
        {/* Bullets */}
        <BulletPoints text="Set your own schedule and prices" />
        <BulletPoints text="Offer any combination of pet care services" />
        <BulletPoints text="Set size , age , and other pet preferences that work for you" />
      </View>
      <View style={styles.verticalPadding} />
      <View style={styles.verticalPadding} />
      {/* Image Quotes 1 */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://picsum.photos/800'}}
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
        <BulletPoints text="The Woofmeets Guarantee, which includes up to $25.000 in vet care reimbursement." />
        <BulletPoints text="Manage your pet sitting schedule and more with the Woofmeets app." />
        <BulletPoints text="24/7 support , including vet assistance." />
      </View>
      <View style={styles.verticalPadding} />
      {/* Image Quotes 2 */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://picsum.photos/800'}}
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
            onSelect={() => props.navigation.navigate('HomeProfile')}
          />
        </View>
      </View>
      {/* Services */}
      <View style={styles.innerContainer}>
        <HeaderText textStyle={styles.titleStylePadding2} text="Services" />
        <ServicesCom />
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
        <BulletPoints text="Every Service you offer on Woofmeets is backed by the Woofmeets Guarantee." />
        <BulletPoints text="Safe , secured and convenient online payments." />
        <BulletPoints text="A top tier support team available 24/7 ." />
        <BulletPoints text="Ongoing pet care education for pet sitters." />
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
          onSelect={() => props.navigation.navigate('HomeProfile')}
        />
      </View>
      <BottomSpacing />
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
  verticalPadding: {
    paddingVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
  },
  titleStyleMedium: {
    textAlign: 'center',
    fontWeight: '500',
  },
  titleStylePaddingMedium: {
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  titleStylePadding: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  titleStylePadding2: {
    textAlign: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: SCREEN_WIDTH <= 800 ? '90%' : '60%',
    alignSelf: 'center',
  },
});

export default SitterInitialScreen;

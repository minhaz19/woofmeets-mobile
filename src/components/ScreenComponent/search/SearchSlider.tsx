import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {
  CatSliderSvg,
  MenWithDogSvg,
} from '../../../screens/search/utils/SearchSliderSvg';
import HeaderText from '../../common/text/HeaderText';
import ShortText from '../../common/text/ShortText';
import TitleText from '../../common/text/TitleText';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import Paginator from './Paginator';

interface Props {
  navigation: {navigate: (arg0: string) => void};
}

const SearchSlider = ({navigation}: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const slidesData = [
    {
      id: 1,
      title: 'Safety first.\nAlways.',
      description:
        "We work resolutely to guarantee tails keep swaying and pet owners' minds are at ease.",
      linkTitle: 'Check Now',
      icon: <MenWithDogSvg width={150} height={150} />,
      backgroundColor: '#DFFFFC',
      screen: () => navigation.navigate('SafetyScreen'),
    },
    {
      id: 2,
      title: 'Schedule Pet \nSittings And \nMore.',
      description: '',
      linkTitle: 'Browse Now',
      icon: <CatSliderSvg width={150} height={150} />,
      backgroundColor: '#FDDFE3',
      screen: () => navigation.navigate('SchedulePetSettings'),
    },
    {
      id: 3,
      title: 'Check out local Caregiver s',
      description:
        "We work resolutely to guarantee tails keep swaying and pet owners' minds are at ease.",
      linkTitle: 'Check Now',
      icon: <MenWithDogSvg width={150} height={150} />,
      backgroundColor: '#FFF7DC',
      screen: () => navigation.navigate('SchedulePetSettings'),
    },
    {
      id: 4,
      title: 'Check out local Caregiver s',
      description:
        "We work resolutely to guarantee tails keep swaying and pet owners' minds are at ease.",
      linkTitle: 'Check Now',
      icon: <MenWithDogSvg width={150} height={150} />,
      backgroundColor: '#E2EEFF',
      screen: () => navigation.navigate('SchedulePetSettings'),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          pagingEnabled
          horizontal
          bounces={false}
          ref={slideRef}
          scrollEventThrottle={32}>
          {slidesData.map((item: any) => {
            return (
              <View
                style={[
                  styles.cardContainer,
                  {backgroundColor: item.backgroundColor},
                ]}
                key={item.id}>
                <View style={styles.textContainer}>
                  <HeaderText
                    text={item.title}
                    textStyle={styles.bigTextStyle}
                  />
                  <ShortText
                    text={item.description}
                    textStyle={styles.shortTextStyle}
                    ellipsizeMode={'tail'}
                    numberOfLines={3}
                  />
                  <TouchableOpacity
                    style={styles.linkContainer}
                    onPress={item.screen}>
                    <TitleText text={item.linkTitle} />
                    <View>
                      <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={
                          SCREEN_WIDTH <= 380
                            ? 20
                            : SCREEN_WIDTH <= 600
                            ? 24
                            : 24
                        }
                        color={Colors.light.text}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>{item.icon}</View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Paginator data={slidesData} scrollX={scrollX} />
    </View>
  );
};

export default SearchSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  tabContainer: {
    marginVertical: '2%',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    width: SCREEN_WIDTH * 0.9,
    // height: SCREEN_HEIGHT * 0.2,
  },
  textContainer: {
    width: '55%',
  },
  iconContainer: {
    width: '45%',
  },
  linkContainer: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  shortTextStyle: {
    color: Colors.light.text,
    paddingTop: 4,
  },
  bigTextStyle: {},
});

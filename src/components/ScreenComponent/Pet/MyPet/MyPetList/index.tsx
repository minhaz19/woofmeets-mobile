import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import {Plus} from '../../../../../assets/SVG_LOGOS';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../constants/Colors';
import HeaderText from '../../../../common/text/HeaderText';
import TitleText from '../../../../common/text/TitleText';

const width = SCREEN_WIDTH;
interface Props {
  dataList?: [
    {
      id: string;
    },
  ];
  onPress?: () => void;
}
const MyPetList = ({dataList, onPress}: Props) => {
  const {isDarkMode, colors} = useTheme();
  console.log(SCREEN_WIDTH);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !dataList
              ? Colors.none
              : isDarkMode
              ? colors.lightBackgroundColor
              : colors.backgroundColor,
            borderColor: isDarkMode ? Colors.shadow : Colors.border,
          },
        ]}>
        {dataList ? (
          <View>
            <Image
              source={require('../../../../../assets/image/pet/mypet.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor: isDarkMode
                    ? colors.lightBackgroundColor
                    : colors.backgroundColor,
                },
              ]}>
              <HeaderText text="Snoopy" textStyle={styles.title} />
              <TitleText textStyle={styles.subTitle} text="Cat" />
              <TitleText textStyle={styles.description} text="2 Years - Male" />
            </View>
          </View>
        ) : (
          <View style={styles.addPet}>
            <Plus fill={isDarkMode ? 'white' : Colors.light.lightText} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MyPetList;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH >= 800 ? width / 3 - 40 : width / 2 - 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },

  image: {
    width: '100%',
    height: SCREEN_HEIGHT / 7.5,
  },
  textContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
  title: {fontSize: Text_Size.Text_9, fontWeight: '600'},
  subTitle: {fontSize: Text_Size.Text_9, fontWeight: '500'},
  description: {fontSize: Text_Size.Text_0},
  addPet: {
    flex: 1,
    paddingTop: 120,
    paddingLeft: SCREEN_WIDTH >= 800 ? width / 8 : width / 5,
  },
});

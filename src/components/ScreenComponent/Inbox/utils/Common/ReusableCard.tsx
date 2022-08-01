/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import DescriptionText from '../../../../common/text/DescriptionText';
import Card from '../../../../UI/Card';
import HeaderText from '../../../../common/text/HeaderText';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

interface Props {
  item: {
    name: string;
    image: any;
    description: string;
    boardingTime: string;
    status: string;
  };
  buttonStyles?: string;
  handlePress?: () => void;
}

const ReusableCard: FC<Props> = ({item, buttonStyles, handlePress}) => {
  const {isDarkMode, colors} = useTheme();
  return (
    <Card
      style={{
        ...styles.itemContainer,
        backgroundColor: isDarkMode
          ? colors.lightBackgroundColor
          : colors.backgroundColor,
      }}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.flexContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={item?.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
            <HeaderText text={item.name} textStyle={styles.textHeader} />
            <DescriptionText
              text={item.boardingTime}
              textStyle={styles.textDescription}
            />
            <DescriptionText
              text={item.description}
              textStyle={styles.textDescription}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            />
          </View>
          <View style={styles.timeContainer}>
            <DescriptionText
              text="9:00 AM"
              textStyle={styles.textTimeDescription}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={[styles.buttonStyles, {backgroundColor: buttonStyles}]}>
            <DescriptionText
              text={item.status}
              textStyle={{color: Colors.light.background}}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ReusableCard;

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
    height: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: '3%',
    borderRadius: 4,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    shadowOpacity: 0.3,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 8 : 1,
    marginHorizontal: '3%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {marginRight: 10},
  detailsContainer: {
    flex: 1,
  },
  timeContainer: {
    width: '20%',
    alignItems: 'center',
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  textDescription: {
    lineHeight: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.02 : 20,
  },
  textHeader: {
    marginTop: 0,
  },
  textTimeDescription: {
    color: Colors.gray,
  },
});

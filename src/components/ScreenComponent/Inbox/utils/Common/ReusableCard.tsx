import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import IOSButton from '../../../../UI/IOSButton';
import DescriptionText from '../../../../common/text/DescriptionText';
import Card from '../../../../UI/Card';
import HeaderText from '../../../../common/text/HeaderText';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
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
  return (
    <Card style={styles.itemContainer}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.flexContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={item?.image}
              style={styles.image}
              resizeMode="cover"
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
  },
  itemContainer: {
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 4,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '3%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '10%',
  },
  detailsContainer: {
    width: '60%',
  },
  timeContainer: {
    width: '20%',
  },
  buttonStyles: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.primary,
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: '2%',
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

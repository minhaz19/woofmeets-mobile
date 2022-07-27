import {StyleSheet, Image, View} from 'react-native';
import React, {CSSProperties, FC} from 'react';
import IOSButton from '../../../../UI/IOSButton';
import DescriptionText from '../../../../common/text/DescriptionText';
import Card from '../../../../UI/Card';
import HeaderText from '../../../../common/text/HeaderText';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';

interface Props {
  item: {
    name: string;
    image: any;
    description: string;
    boardingTime: string;
    status: string;
  };
  buttonStyles?: string;
}

const ReusableCard: FC<Props> = ({item, buttonStyles}) => {
  return (
    <Card style={styles.itemContainer}>
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image source={item?.image} style={styles.image} resizeMode="cover" />
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
        <View style={styles.buttonStyles}>
          <IOSButton
            containerStyle={styles.containerStyleSmall}
            onSelect={() => {}}
            textAlignment={{backgroundColor: buttonStyles, borderRadius: 100}}
            titleStyle={btnStyles.textStyle}
            title={item.status}
          />
        </View>
      </View>
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
    paddingVertical: '1%',
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
  },
  textAlignment: {
    backgroundColor: Colors.success,
    borderRadius: 100,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: '2%',
  },
  containerStyleSmall: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.04 : 30,
    borderRadius: 100,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    marginBottom: 0,
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
  SvgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  item: {
    name: string;
    image: string;
    description: string;
    boardingTime: string;
    status: string;
    pickUpStartTime?: string;
  };
  buttonStyles?: string;
  handlePress?: () => void;
}

const ReusableCard: FC<Props> = ({item, buttonStyles, handlePress}) => {
  const {isDarkMode, colors} = useTheme();
  console.log('image', item.image);
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
          <View
            style={{...styles.imageContainer, borderColor: colors.borderColor}}>
            <Image
              source={{uri: item?.image?.url}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.detailsContainer}>
            <HeaderText text={item.name} textStyle={styles.textHeader} />
            <DescriptionText
              text={item.boardingTime}
              textStyle={styles.textDescriptionOne}
            />
            <DescriptionText
              text={item.description}
              textStyle={styles.textDescription}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <View style={styles.timeContainer}>
            <DescriptionText
              text={item.pickUpStartTime}
              textStyle={styles.textTimeDescription}
            />

            <View
              style={[styles.buttonStyles, {backgroundColor: buttonStyles}]}>
              <DescriptionText
                text={item.status}
                textStyle={{
                  fontSize: Text_Size.Text_10,
                  color: Colors.light.background,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ReusableCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    padding: '3%',

    borderRadius: 4,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    elevation: Platform.OS === 'android' ? 1 : 1,
    marginHorizontal: '3%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    marginRight: 10,
    width: '15%',
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  detailsContainer: {
    flex: 1,
  },
  timeContainer: {
    // width: '25%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  textDescription: {
    fontSize: Text_Size.Text_9,
  },
  textHeader: {
    marginTop: 0,
  },
  textDescriptionOne: {
    fontSize: Text_Size.Text_9,
  },
  textTimeDescription: {
    color: Colors.gray,
    fontSize: Text_Size.Text_12,
  },
});

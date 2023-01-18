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
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../../constants/textScaling';
import changeTextLetter from '../../../../common/changeTextLetter';
import {useReusbaleCard} from './utils/useReusableCard';

interface Props {
  item: {
    name: string;
    image: any;
    description: string;
    boardingTime: string;
    status: string;
    pickUpStartTime?: string;
    roomId: string;
  };
  statusColor: string[];
  handlePress?: () => void;
}

const img =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const ReusableCard: FC<Props> = ({
  item,
  statusColor,
  // read = true,
  handlePress,
}) => {
  const {colors} = useTheme();
  const {unRead} = useReusbaleCard(item.roomId);
  return (
    <Card
      style={{
        ...styles.itemContainer,
        backgroundColor: colors.backgroundColor,

        shadowColor: Colors.lightShade,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.flexContainer}>
          <View
            style={{
              ...styles.imageContainer,
              borderColor: statusColor[1],
              position: 'relative',
            }}>
            {unRead && (
              <View
                style={{
                  backgroundColor: statusColor[1],
                  width: 10,
                  height: 10,
                  borderRadius: 100,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              />
            )}
            <Image
              source={{uri: item?.image?.url ? item?.image?.url : img}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.detailsContainer}>
            <HeaderText
              text={item.name}
              textStyle={{
                marginTop: 0,
                fontWeight: unRead ? 'bold' : '400',
              }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <DescriptionText
                text={item.boardingTime + ' - '}
                textStyle={{
                  fontSize: Text_Size.Text_9,
                  marginVertical: 4,
                  fontWeight: unRead ? 'bold' : '400',
                }}
              />
              <View
                style={[
                  {
                    // backgroundColor: statusColor[0],
                    borderRadius: 50,
                    width: 107,
                  },
                ]}>
                <DescriptionText
                  text={
                    item.status === 'PAID' ||
                    item.status === 'COMPLETED' ||
                    item.status === 'CANCELLED'
                      ? 'Paid'
                      : 'Unpaid'
                  }
                  textStyle={{
                    fontSize: Text_Size.Text_10,
                    color: statusColor[1],
                    paddingVertical: 2,
                    fontWeight: 'bold',
                    // textAlign: 'center',
                  }}
                />
              </View>
            </View>
            <DescriptionText
              text={item.description}
              textStyle={{
                fontSize: Text_Size.Text_9,
                fontWeight: unRead ? 'bold' : '400',
              }}
              numberOfLines={1}
              // ellipsizeMode="tail"
            />
          </View>
          <View style={styles.timeContainer}>
            <View
              style={[
                {
                  backgroundColor: statusColor[0],
                  borderRadius: 50,
                  width: 107,
                },
              ]}>
              <DescriptionText
                text={changeTextLetter(item.status.toLowerCase())!}
                textStyle={{
                  fontSize: Text_Size.Text_8,
                  color: statusColor[1],
                  paddingVertical: 2,
                  fontWeight: '900',
                  textAlign: 'center',
                }}
              />
            </View>
          </View>
          {unRead && (
            <View
              style={{
                backgroundColor: statusColor[1],
                width: 10,
                height: 10,
                borderRadius: 100,
                position: 'absolute',
                top: '50%',
                right: 4,
              }}
            />
          )}
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
    borderWidth: 2,
    borderColor: Colors.background,
    borderRadius: 100,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,

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
    marginRight: 20,
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
    // overflow: 'hidden',
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  timeContainer: {
    // width: '25%',
    // alignItems: 'flex-end',
    // justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
    top: 0,
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

  textTimeDescription: {
    color: Colors.gray,
    fontSize: Text_Size.Text_12,
    // backgroundColor: 'red',
  },
});

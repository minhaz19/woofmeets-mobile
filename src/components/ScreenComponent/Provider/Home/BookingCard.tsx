import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Platform,
  } from 'react-native';
  import React, {FC} from 'react';
  import DescriptionText from '../../../common/text/DescriptionText';
  import Card from '../../../UI/Card';
  import HeaderText from '../../../common/text/HeaderText';
  import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
  import Colors from '../../../../constants/Colors';
  import {useTheme} from '../../../../constants/theme/hooks/useTheme';
  import ShortText from '../../../common/text/ShortText';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
  
  interface Props {
    item: {
        id: number,
        serviceName: string,
        duration: string,
        orderStatus: string,
        ownerName: string,
        petName: string,
        ownerImage: string,
    };
    buttonStyles?: string;
    handlePress?: () => void;
  }
  
  const BookingCard: FC<Props> = ({item, buttonStyles, handlePress}) => {
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
            <View style={styles.topContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item?.ownerImage}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <HeaderText text={item.serviceName} textStyle={styles.textHeader} />
                    <ShortText
                        text={item.duration}
                        textStyle={styles.textDescription}
                    />
                </View>
                
            </View>
            <View style={styles.timeContainer}>
              <ShortText
                text={item.orderStatus}
                textStyle={styles.textTimeDescription}
              />
            </View>
          </View>
            <View style={[styles.topContainer, {paddingTop: 10}]}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item?.ownerImage}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <View>
                    <TitleText text={item.ownerName} textStyle={styles.textHeader} />
                    <ShortText
                        text={item.petName}
                        textStyle={styles.textDescription}
                    />
                </View>
                
            </View>
        </TouchableOpacity>
      </Card>
    );
  };
  
  export default BookingCard;
  
  const styles = StyleSheet.create({
    image: {
      borderRadius: 100,
      width: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
      height: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
      marginRight: 10,
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
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
    },
    imageContainer: {
        marginRight: 10,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailsContainer: {
      flex: 1,
    },
    timeContainer: {
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
      fontSize: Text_Size.Text_8
    },
    textHeader: {
      marginTop: 0,
    },
    textTimeDescription: {
      color: Colors.gray,
    },
  });
  
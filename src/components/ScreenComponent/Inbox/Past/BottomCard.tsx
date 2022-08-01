/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React, {FC, useState} from 'react';
import Ion from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import HeaderText from '../../../common/text/HeaderText';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {
  FeatherSvg,
  InfoSvg,
  PaymentSvg,
  LocationSvg,
  LeftArrow,
  RightArrow,
  CalendarSvg,
} from '../utils/SvgComponent/SvgComponent';
import DescriptionText from '../../../common/text/DescriptionText';
import Card from '../../../UI/Card';
import BottomSpacing from '../../../UI/BottomSpacing';
import AppCheckbox from '../../../common/Form/AppCheckbox';
import {useDispatch} from 'react-redux';
import {setOpenFilter} from '../../../../store/slices/openFilter';

interface Props {
  isPayment: boolean;
  isPet: boolean;
  setIsPayment: (value: boolean) => void;
  setIsPet: (value: boolean) => void;
}

const BottomCard: FC<Props> = ({isPayment, isPet, setIsPayment, setIsPet}) => {
  const {colors} = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [isBooked, setIsBooked] = useState(true);
  const [isAnyTime, setIsAnyTime] = useState(false);
  const [isNever, setIsNever] = useState(false);
  const [selectData, setSelectData] = useState(
    'Once you have booked a stay or walk',
  );
  const dispatch = useDispatch();

  const tempData = [
    {
      id: 1,
      icon: <PaymentSvg height={16} width={16} />,
      title: '$34.41',
      editSvg: <InfoSvg height={16} width={16} />,
      isActive: isPayment,
      onPress: () => {
        setIsPayment(true);
      },
    },
    {
      id: 2,
      icon: <CalendarSvg height={16} width={16} />,
      title: 'Jun 14, 2022 - Jun 16, 2022',
    },
    {
      id: 3,
      icon: <RightArrow height={16} width={16} />,
      title: 'From : 10:00 AM - 10:00 AM',
    },
    {
      id: 4,
      icon: <LeftArrow height={16} width={16} />,
      title: 'To : 10:00 AM - 10:00 AM',
    },
    {
      id: 5,
      icon: <LocationSvg height={16} width={16} />,
      title: "Steave's home",
    },
    {
      id: 6,
      icon: <LocationSvg height={16} width={16} />,
      title: '1 Pet',
      editSvg: <InfoSvg height={16} width={16} />,
      isActive: isPet,
      onPress: () => {
        setIsPet(true);
      },
    },
  ];
  const dropDownData = [
    {
      title: 'Once you have booked a stay or walk',
      active: isBooked,
      onPress: () => {
        setIsBooked(true);
        setIsAnyTime(false);
        setIsNever(false);
        setSelectData('Once you have booked a stay or walk');
      },
    },
    {
      title: 'Anytime',
      active: isAnyTime,
      onPress: () => {
        setIsBooked(false);
        setIsAnyTime(true);
        setIsNever(false);
        setSelectData('Anytime');
      },
    },
    {
      title: 'Never',
      active: isNever,
      onPress: () => {
        setIsBooked(false);
        setIsAnyTime(false);
        setIsNever(true);
        setSelectData('Never');
      },
    },
  ];
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => dispatch(setOpenFilter(false))}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <HeaderText text={'Dog Boarding'} textStyle={styles.textHeader} />
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      {tempData.map((item, index) => {
        return item.editSvg ? (
          <TouchableOpacity key={index} onPress={item.onPress}>
            <View style={styles.flexContainer}>
              <View style={styles.flexInnerContainer}>
                {item.icon}
                <HeaderText text={item.title} textStyle={styles._text} />
              </View>
              {item.editSvg && item.editSvg}
            </View>
          </TouchableOpacity>
        ) : (
          <View key={index} style={styles.flexContainer}>
            <View style={styles.flexInnerContainer}>
              {item.icon}
              <HeaderText text={item.title} textStyle={styles._text} />
            </View>
          </View>
        );
      })}
      <View style={styles.profileContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
          }}
          resizeMode="contain"
        />
        <View style={styles._text}>
          <HeaderText text={'$34.41'} />
          <DescriptionText text={'Mixed'} textStyle={{lineHeight: 20}} />
          <DescriptionText
            text={'10 Years , 8 months old'}
            textStyle={{color: colors.descriptionText, lineHeight: 20}}
          />
        </View>
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <Card style={styles.cardSetting}>
        <TouchableOpacity
          onPress={() => {
            setShowDropDown(!showDropDown);
          }}>
          <HeaderText text={'Call Setting'} textStyle={styles.newTextHeader} />
          <View style={[styles.flexInnerContainer, {paddingTop: 5}]}>
            <HeaderText
              text={'Call Steve may call your Pet Number'}
              textStyle={{paddingRight: 10}}
            />
            {showDropDown && <FeatherSvg height={16} width={16} />}
          </View>
          <DescriptionText
            text={selectData}
            textStyle={{
              color: colors.descriptionText,
              paddingTop: 5,
            }}
          />
        </TouchableOpacity>
      </Card>
      {showDropDown && (
        <Card style={styles.cardSetting}>
          {dropDownData.map((item, index) => {
            return (
              <View key={index}>
                <AppCheckbox
                  title={item.title}
                  radio
                  active={item.active}
                  onPress={item.onPress}
                />
              </View>
            );
          })}
        </Card>
      )}
      {!showDropDown && (
        <TouchableOpacity onPress={() => dispatch(setOpenFilter(false))}>
          <HeaderText text={'Cancel'} textStyle={styles.cancelText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 20},
  textHeader: {
    fontSize: Text_Size.Text_2,
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginVertical: 10,
  },
  flexInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  _text: {
    marginLeft: 10,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  profileContainer: {
    flexDirection: 'row',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  cardSetting: {
    padding: '2%',
  },
  newTextHeader: {
    lineHeight: 20,
    fontSize: Text_Size.Text_2,
  },
  cancelText: {
    fontSize: Text_Size.Text_2,
    color: Colors.alert,
    textAlign: 'center',
    marginTop: SCREEN_WIDTH <= 380 ? '7%' : SCREEN_WIDTH <= 600 ? '12%' : '8%',
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '10%' : '6%',
  },
});

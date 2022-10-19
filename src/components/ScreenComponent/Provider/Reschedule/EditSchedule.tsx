/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';

import Ion from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../../store/store';
import Text_Size from '../../../../constants/textScaling';
import ShortText from '../../../common/text/ShortText';
import DescriptionText from '../../../common/text/DescriptionText';
import {
  CalendarSvg,
  ClockSvg,
  PetFoot,
} from '../../../../assets/svgs/SVG_LOGOS';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import SwitchView from '../../../common/switch/SwitchView';
import TitleText from '../../../common/text/TitleText';

interface Props {
  setViewDetails: (arg1: boolean) => void;
}

const scheduleData = [
  {
    id: 1,
    name: 'Date',
    description: 'Tap to add',
    icon: <CalendarSvg height={18} width={18} />,
  },
  {
    id: 2,
    name: 'Drop-off range',
    description: 'Add times',
    icon: <ClockSvg height={18} width={18} />,
  },
  {
    id: 3,
    name: 'Pick-up range',
    description: 'Add times',
    icon: <ClockSvg height={18} width={18} />,
  },
];

const EditSchedule = ({setViewDetails}: Props) => {
  const {colors} = useTheme();
  const [activeSwitch, setActiveSwitch] = useState<boolean>(false);
  const {selectedItem, selectService} = useAppSelector(
    state => state.reschedule,
  );

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setViewDetails(true)}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <HeaderText text={selectedItem} textStyle={styles.textHeader} />
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <HeaderText text={'Service'} textStyle={{color: Colors.primary}} />
      <View style={styles.serviceContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: selectService.icon}}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <HeaderText text={selectService.name} textStyle={styles.titleStyle} />
          <ShortText
            text={"in the sitter's home"}
            textStyle={styles.shortText}
          />
        </View>
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <HeaderText text={'Edit Schedule'} textStyle={styles.HeaderText} />
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {scheduleData.map((item: any) => {
          return (
            <View style={styles.serviceContainer} key={item.id}>
              <View>{item.icon}</View>
              <View style={styles.textContainer}>
                <TitleText text={item.name} textStyle={styles.titleStyle} />
                <DescriptionText
                  text={item.description}
                  textStyle={styles.shortText}
                />
              </View>
            </View>
          );
        })}
        <View
          style={[styles.divider, {backgroundColor: colors.descriptionText}]}
        />
        <HeaderText text={'Pets'} textStyle={styles.HeaderText} />
        <View style={styles.petContainer}>
          <PetFoot height={24} width={24} />
          <HeaderText text={'Pets'} textStyle={{paddingLeft: 10}} />
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.serviceContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: selectService.icon}}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <HeaderText text={'jony'} textStyle={styles.titleStyle} />
              <DescriptionText
                text={'10 years, 8 months old'}
                textStyle={styles.shortText}
              />
            </View>
          </View>
          <View>
            <SwitchView
              isActive={activeSwitch}
              activeText=""
              inActiveText=""
              onSelect={is => {
                setActiveSwitch(is);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <ButtonCom
          title={'Send Request'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
    </View>
  );
};

export default EditSchedule;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 20},
  textHeader: {
    // fontSize: Text_Size.Text_2,
  },
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    marginRight: 6,
  },
  image: {width: '100%', height: '100%'},
  textContainer: {
    paddingLeft: 10,
  },
  titleStyle: {
    paddingBottom: 6,
    fontWeight: '600',
  },
  shortText: {color: Colors.gray},
  HeaderText: {
    color: Colors.primary,
    // fontSize: Text_Size.Text_2,
  },
  petContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  footerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
    width: '60%',
    alignSelf: 'center',
  },
});

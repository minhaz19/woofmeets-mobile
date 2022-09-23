import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../../assets/svgs/Services_SVG';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  serviceData: any;
}

const ServiceSetting = ({serviceData}: Props) => {
  const {colors} = useTheme();
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sitter-home':
        return <BoardingIcon width={34} height={36} />;
      case 'sitter-traveling':
        return <HouseSittingIcon width={34} height={36} />;
      case 'homevists':
        return <DropInVisitIcon width={34} height={36} />;
      case 'walking':
        return <DogWalkingIcon width={34} height={36} />;
      case 'daycare':
        return <DoggyDayCareIcon width={34} height={36} />;
    }
  };
  return (
    <View>
      {serviceData &&
        serviceData.map((item: any, index: number) => {
          return (
            <TouchableOpacity key={index}>
              <View style={styles.flexContainer}>
                <View style={styles.serviceContainer}>
                  <View>{getIcon(item.serviceType.icon)}</View>
                  <View style={styles.textContainer}>
                    <HeaderText
                      text={item.serviceType.name}
                      textStyle={styles.titleStyle}
                    />
                    <DescriptionText
                      text={'active'}
                      textStyle={styles.shortText}
                    />
                  </View>
                </View>
                <View>
                  <MaterialCommunityIcons
                    name={'chevron-right'}
                    size={
                      SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 28 : 28
                    }
                    style={styles.iconStyle}
                    color={Colors.subText}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default ServiceSetting;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    paddingLeft: 10,
  },
  titleStyle: {
    paddingBottom: 6,
  },
  shortText: {color: Colors.gray},
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '2%',
  },
  iconStyle: {},
});

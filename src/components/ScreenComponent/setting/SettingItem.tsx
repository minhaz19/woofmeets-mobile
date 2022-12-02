import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';
import {NumberProp} from 'react-native-svg';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

const SettingItem = (props: {
  data: {
    icon?: any;
    screenName: ((event: GestureResponderEvent) => void) | undefined;
    opacity: NumberProp | undefined;
    title: string;
    details?: string;
    rightIcon?: any;
    vectorIcon?: any;
    id: any;
    color?: string;
    iconSetIcon?: any;
  };
  descriptionStyle?: TextStyle;
  key?: number;
}) => {
  const {colors} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.backgroundColor,
  };
  return (
    <TouchableOpacity
      onPress={props.data.screenName}
      style={{
        backgroundColor: backgroundStyle.backgroundColor,
        borderBottomWidth: 1,
        borderTopWidth: props.data.id === 1 ? 1 : 0,
        borderColor: colors.borderColor,
      }}>
      <View style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          {props.data.iconSetIcon && props.data.iconSetIcon}
          {props.data.icon && <props.data.icon
            height={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 24 : 28}
            opacity={props.data.opacity}
            color={'red'}
          />}
          {props.data.vectorIcon && props.data.vectorIcon}
          <View
            style={[
              styles.detailsContainer,
              {width: props.rightIcon ? '82%' : '85%'},
            ]}>
            <HeaderText
              text={props.data.title}
              textStyle={props.data.color && {color: props.data.color}}
            />
            {props.data.details && (
              <DescriptionText
                text={props.data.details}
                textStyle={props.descriptionStyle}
              />
            )}
          </View>
        </View>
        {props.data.rightIcon && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
            style={styles.iconStyle}
            color={Colors.subText}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '6%' : '8%',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 0},
  detailsContainer: {
    width: '82%',
    paddingLeft: '5%',
  },
  details: {
    fontSize: Text_Size.Text_0,
  },
});

export default SettingItem;

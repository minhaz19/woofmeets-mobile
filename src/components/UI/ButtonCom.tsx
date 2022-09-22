/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import DotLoader from '../common/Loaders/DotLoader';
import SuccessANI from '../common/LottieAnimations/SuccessANI';
import Card from './Card';
interface Props {
  containerStyle: any;
  progressStyle?: ViewStyle | undefined;
  onSelect: ((event: GestureResponderEvent) => void) | undefined;
  textAlignment: ViewStyle | undefined;
  isLeftIcon?: any;
  titleStyle: TextStyle | undefined;
  title: String | undefined;
  icon?: any;
  loading?: boolean;
  success?: boolean;
}
const ButtonCom = ({
  containerStyle,
  progressStyle,
  onSelect,
  textAlignment,
  isLeftIcon,
  success,
  titleStyle,
  title,
  icon,
  loading = false,
}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Card
      style={{
        ...styles.cardlist,
        backgroundColor: success
          ? Colors.success
          : isDarkMode
          ? Colors.button.grey
          : Colors.primary,
        ...containerStyle,
      }}>
      <View style={{...styles.progressContainer, ...progressStyle}} />
      <View style={{...styles.touchable}}>
        <TouchableOpacity onPress={onSelect} disabled={loading}>
          <View style={{...styles.card, ...textAlignment}}>
            {success ? (
              <SuccessANI />
            ) : loading ? (
              <DotLoader />
            ) : (
              <>
                <Text
                  style={{
                    ...styles.title,
                    ...titleStyle,
                  }}>
                  {title}
                </Text>
                {icon && (
                  <Icon
                    name="keyboard-arrow-right"
                    size={24}
                    color={Colors.primary}
                  />
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardlist: {
    marginBottom: 15,
    borderRadius: 7,
    marginLeft: '5%',
  },
  touchable: {
    borderRadius: 4,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  progressContainer: {
    height: '100%',
    position: 'absolute',
  },
});
export default ButtonCom;

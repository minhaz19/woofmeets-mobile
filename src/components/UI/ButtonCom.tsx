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
import Card from './Card';

const ButtonCom = (props: {
  containerStyle: any;
  progressStyle?: ViewStyle | undefined;
  onSelect: ((event: GestureResponderEvent) => void) | undefined;
  textAlignment: ViewStyle | undefined;
  isLeftIcon?: any;
  titleStyle: TextStyle | undefined;
  title: String | undefined;
  icon?: any;
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Card
      style={{
        ...styles.cardlist,
        ...props.containerStyle,
        backgroundColor: isDarkMode ? Colors.button.grey : Colors.primary,
      }}>
      <View style={{...styles.progressContainer, ...props.progressStyle}} />
      <View style={{...styles.touchable}}>
        <TouchableOpacity onPress={props.onSelect}>
          <View style={{...styles.card, ...props.textAlignment}}>
            <Text
              style={{
                ...styles.title,
                ...props.titleStyle,
              }}>
              {props.title}
            </Text>
            {props.icon && (
              <Icon
                name="keyboard-arrow-right"
                size={24}
                color={Colors.primary}
              />
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
    fontSize: 16,
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

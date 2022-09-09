import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  icon: any;
  checked: boolean;
  screen?: () => void;
}

const SelectServiceTitle = ({title, icon, checked, screen}: Props) => {
  return (
    <TouchableOpacity onPress={screen}>
      <View style={styles.titleContainer}>
        <View style={styles.boxContainer}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={checked ? Colors.primary : Colors.subText}
          />
          <TitleText
            text={title}
            textStyle={{
              ...styles.titleStyle,
              color: checked ? Colors.primary : Colors.subText,
            }}
          />
        </View>
        <View style={styles.iconStyle}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectServiceTitle;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  titleStyle: {
    paddingLeft: 6,
    fontSize: Text_Size.Text_9,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: 16,
  },
});

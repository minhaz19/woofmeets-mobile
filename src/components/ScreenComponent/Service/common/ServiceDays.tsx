import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../constants/textScaling';

interface Props {
  title: string;
}
const ServiceDays = ({title}: Props) => {
  const {colors} = useTheme();
  const [checkSq, setCheckSq] = useState(false);
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setCheckSq(!checkSq)}>
      <View
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <Text style={[styles.text, {color: colors.descriptionText}]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceDays;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  text: {
    fontSize: Text_Size.Text_0,
  },
});

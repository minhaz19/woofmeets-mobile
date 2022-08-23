/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import { useTheme } from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';

interface Props {
  data: any;
  noShadow?: boolean;
  onPressEvent(id: number): () => void;
}

const ReusableServices: FC<Props> = data => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={() => data.onPressEvent(data.data.id - 1)}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderBottomWidth: 1,
          },
        ]}>
        <View style={styles.boxContainer}>
          <View style={styles.imageContainer}>{data.data.image}</View>
          <View style={styles.textContainer}>
            <HeaderText text={data.data.name} />
            <DescriptionText text={data.data.description} textStyle={styles.description} />
            <DescriptionText text={data.data.price} textStyle={styles.description} />
          </View>
        </View>
        <Ionicons name="checkmark-circle" size={22} color={data.data.clicked ? Colors.primary : Colors.subText} />
      </View>
    </TouchableOpacity>
  );
};

export default ReusableServices;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderColor: '#ffebd9',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '90%',
  },
  description: {
    paddingVertical: 6,
  },
});

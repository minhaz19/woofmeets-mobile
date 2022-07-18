import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';

interface Props {
  data: any;
}
type StackParamList = {
  ServiceDetails: {itemId: any} | undefined;
};

type NavigationProps = StackNavigationProp<StackParamList>;

const ReusableSelectService: FC<Props> = data => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ServiceDetails', {
          itemId: data.data.id,
        })
      }>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <View style={styles.boxContainer}>
          <View style={styles.imageContainer}>{data.data.image}</View>
          <View style={styles.textContainer}>
            <HeaderText text={data.data.name} />
            <DescriptionText text={data.data.description} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReusableSelectService;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ffebd9',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {},
});

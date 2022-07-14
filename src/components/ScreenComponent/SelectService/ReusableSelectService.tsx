import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Text_Size from '../../../constants/textScaling';

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
          <View style={styles.imageContainer}>
            <Image
              source={data.data.image}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text_1, {color: colors.headerText}]}>
              {data.data.name}
            </Text>
            <Text style={[styles.text_2, {color: colors.lightText}]}>
              {data.data.description}
            </Text>
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
    width: 24,
    height: 24,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text_1: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  text_2: {
    fontSize: Text_Size.Text_0,
  },
  textContainer: {},
});

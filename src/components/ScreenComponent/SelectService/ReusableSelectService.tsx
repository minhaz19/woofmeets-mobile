import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import Colors from '../../../constants/Colors';

interface Props {
  data: any;
}
const ReusableSelectService: FC<Props> = data => {
  console.log(data);
  const colars = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={data.data.image}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text_1}>{data.data.name}</Text>
          <Text style={styles.text_2}>{data.data.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReusableSelectService;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text_1: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text_2: {
    fontSize: 12,
  },
});

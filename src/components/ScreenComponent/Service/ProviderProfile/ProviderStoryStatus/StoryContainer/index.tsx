import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArrowLeft} from '../../../../../../assets/svgs/Services_SVG';

interface Props {
  image: string;
}
type StackParamList = {
  ProviderStoryStatus: {name: string; image: string};
};
type NavigationProps = StackNavigationProp<StackParamList>;
const StoryContainer = ({image}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <ArrowLeft />
      </TouchableOpacity>
    </View>
  );
};

export default StoryContainer;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    padding: 20,
    top: '12%',
    left: '0%',
  },
});
// onPress={() =>
//       navigation.push('ProviderStoryStatus', {
//         name: 'meer',
//         image:
//           'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
//       })
//     }

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
        <ArrowLeft width={15} height={15} fill="white" />
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 20,
    top: '12%',
    left: '0%',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor: false ? 'rgba(255, 255, 255, .1)' : 'rgba(0, 0, 0, 0.5)',
  },
});

import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ArrowLeft} from '../../../../../assets/svgs/Services_SVG';

type StackParamList = {
  ProviderStoryStatus: {name: string; image: string};
};
type NavigationProps = StackNavigationProp<StackParamList>;
const StoryContainer = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('ProviderStoryStatus', {
          name: 'meer',
          image:
            'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
        })
      }>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
        }}
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <ArrowLeft />
      </TouchableOpacity>
    </TouchableOpacity>
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
    top: '20%',
    left: '5%',
  },
});

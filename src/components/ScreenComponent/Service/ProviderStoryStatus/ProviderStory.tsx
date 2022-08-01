/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import ProviderStoryInput from './ProviderStoryInput';
interface Props {
  route: {params: {name: number; image: string}};
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}

const ProviderStory = ({route, navigation}: Props) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const {name} = route.params;
  const {image} = route.params;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, [navigation, progress]);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="tranparent" barStyle="light-content" />
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, {width: progressAnimation}]}
        />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{name}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic name="close" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{uri: image}} style={styles.storyImage} />
      <ProviderStoryInput navigation={navigation} />
    </View>
  );
};

export default ProviderStory;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 3,
    width: '95%',
    backgroundColor: Colors.background,
    top: 50,
    zIndex: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.gray,
    zIndex: 10,
  },
  imageContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 55,
    left: 0,
    width: '90%',
  },
  imageWrapper: {
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
    backgroundColor: 'orange',
    resizeMode: 'cover',
    width: '92%',
    height: '100%',
    flex: 1,
  },
  infoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    fontSize: Text_Size.Text_0,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: Colors.text,
  },
  icon: {fontSize: 20, opacity: 0.6},
  storyImage: {width: '100%', height: '100%', zIndex: -1},
});

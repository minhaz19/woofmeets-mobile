import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const StoryContainer = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default StoryContainer;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 250,
  },
});

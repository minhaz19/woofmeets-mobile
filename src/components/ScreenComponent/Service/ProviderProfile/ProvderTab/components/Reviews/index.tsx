import {StyleSheet, View} from 'react-native';
import React from 'react';
import ReviewItem from './components/ReviewItem';

const Reviews = () => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((_, i) => (
        <ReviewItem key={i} />
      ))}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

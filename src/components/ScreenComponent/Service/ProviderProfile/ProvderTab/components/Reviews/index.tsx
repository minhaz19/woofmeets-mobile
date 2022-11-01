import {StyleSheet, View} from 'react-native';
import React from 'react';
import ReviewItem from './components/ReviewItem';
import {useAppSelector} from '../../../../../../../store/store';
import HeaderText from '../../../../../../common/text/HeaderText';

const Reviews = () => {
  const {reviews} = useAppSelector(state => state.providerProfile);

  return (
    <View style={styles.container}>
      {reviews.length > 0 ? (
        reviews?.map((item: any, i: React.Key | null | undefined) => (
          <ReviewItem key={i} item={item} />
        ))
      ) : (
        <HeaderText
          textStyle={{textAlign: 'center', marginVertical: 10}}
          text={'No Reviews found'}
        />
      )}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});

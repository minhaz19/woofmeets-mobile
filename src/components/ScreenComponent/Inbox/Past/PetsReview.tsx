import {StyleSheet, TextInput, View} from 'react-native';
import React, {FC} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import {AirbnbRating} from 'react-native-ratings';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import { SCREEN_HEIGHT } from '../../../../constants/WindowSize';

interface props {
  pet: any;
  petsReview: any;
  setPetReview: (arg:any) => void;
}
const PetsReview: FC<props> = ({pet, petsReview, setPetReview}) => {
  const petRating = petsReview?.filter(item => pet?.petId === item?.petId)[0]
    ?.rating;
  const petComment = petsReview?.filter(item => pet?.petId === item?.petId)[0]
    ?.comment;

  const petRatingChanged = (newRating: number) => {
    setPetReview(
      petsReview.map(obj => {
        if (obj.petId === pet?.petId) {
          return {...obj, rating: newRating};
        }
        return obj;
      }),
    );
  };
  const changePetComment = (e: string) => {
    setPetReview(
      petsReview.map(obj => {
        if (obj.petId === pet?.petId) {
          return {...obj, comment: e};
        }

        return obj;
      }),
    );
  };
  return (
    <>
      <View>
        <HeaderText
          text={`Would you like to rate ${pet?.pet?.name}`}
          textStyle={styles.header}
        />
        <AirbnbRating
          showRating={false}
          count={5}
          defaultRating={petRating}
          size={50}
          onFinishRating={value => petRatingChanged(value)}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            borderColor: Colors.border,
          },
        ]}>
        <TextInput
          placeholderTextColor={'gray'}
          allowFontScaling={false}
          style={[styles.text, {color: 'black'}]}
          placeholder="Write your Comments"
          multiline={true}
          value={petComment}
          onChangeText={value => changePetComment(value)}
        />
      </View>
    </>
  );
};

export default PetsReview;

const styles = StyleSheet.create({
    container: {
        borderRadius: 2,
        flexDirection: 'row',
        paddingHorizontal: 8,
        marginBottom: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 20,
      },
      text: {
        fontFamily: 'Muli',
        flex: 1,
        alignSelf: 'flex-start',
        height: 120,
        width: '100%',
        fontSize: Text_Size.Text_11,
      },
      header: {
        fontSize: Text_Size.Text_2,
        marginVertical: 10,
      },
});

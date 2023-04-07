import {StyleSheet, Image, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {AirbnbRating} from 'react-native-ratings';
import {DogFeet} from '../../../../assets/svgs/SVG_LOGOS';
import Lottie from 'lottie-react-native';
import {CancelToken} from 'apisauce';

const SeePetReview = (props: {
  navigation: {navigate: (arg0: string, arg1?: any) => any};
  route: any;
}) => {
  const {colors} = useTheme();
  const {petId, petInfo} = props?.route?.params;
  const [petReview, setPetReview] = useState({});
  const petDetails = petInfo.find(p => p.petId === petId);
  const endPoint = `/pet-review/pet/${petId}`;
  const {request, loading} = useApi(methods._get);
  const getPetReview = async () => {
    const result = await request(endPoint);
    if (result?.ok) {
      setPetReview(result?.data?.data);
    }
  };

  useEffect(() => {
    const source = CancelToken.source();
    getPetReview();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      {loading && (
        <View style={styles.overlay}>
          <View
            style={[styles.overlay, {backgroundColor: colors.backgroundColor}]}>
            <Lottie
              autoPlay
              loop
              source={require('../../../../assets/NewPetLoader.json')}
              style={styles.loaderStyle}
            />
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <View style={styles.petContainer}>
          <View style={styles.imageContainer}>
            {petDetails?.pet?.profile_image?.url ? (
              <Image
                source={{uri: petDetails?.pet?.profile_image?.url}}
                style={styles.image}
              />
            ) : (
              <DogFeet height={70} width={70} />
            )}
          </View>
          <View style={styles.detailsContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <HeaderText
                text={petDetails?.pet?.name}
                textStyle={{paddingRight: 10}}
              />
              <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={
                  petReview?.rating?.average ? petReview?.rating?.average : 0
                }
                size={15}
                isDisabled
              />
            </View>
            <DescriptionText
              text={petDetails?.pet?.gender + ' ' + petDetails?.pet?.type}
            />
            <DescriptionText
              text={
                petDetails?.pet?.ageYear +
                ' Year ' +
                petDetails?.pet?.ageMonth +
                ' Month' +
                ' WEIGHS ' +
                petDetails?.pet?.weight +
                ' ' +
                petDetails?.pet?.weightUnit
              }
            />
            <DescriptionText
              text={`${
                petReview?.rating?.totalCount
                  ? petReview?.rating?.totalCount
                  : 0
              } Reviews`}
            />
          </View>
        </View>
        <View>
          <HeaderText text={'Latest Reviews'} />
          {petReview?.petReviews ? (
            petReview?.petReviews?.map((review: any, index: number) => {
              return (
                <View style={styles.petContainer} key={index}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{
                        uri: review?.user?.image?.url
                          ? review?.user?.image?.url
                          : 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg',
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <HeaderText
                        text={`${
                          review?.user?.firstName +
                          ' ' +
                          (review?.user?.lastName).charAt(0) +
                          '.'
                        }`}
                        textStyle={{paddingRight: 10}}
                      />
                      <AirbnbRating
                        showRating={false}
                        count={5}
                        defaultRating={review?.rating}
                        size={15}
                        isDisabled
                      />
                    </View>
                    <DescriptionText
                      text={review?.comment}
                      textStyle={{width: '100%'}}
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <HeaderText
              text={'No reviews found'}
              textStyle={{textAlign: 'center', paddingTop: 10}}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default SeePetReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  petContainer: {
    flexDirection: 'row',
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  image: {
    borderRadius: 50,
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    width: '70%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,

    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  loaderStyle: {width: '30%'},
});

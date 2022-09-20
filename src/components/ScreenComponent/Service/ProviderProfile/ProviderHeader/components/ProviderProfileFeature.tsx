import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Experience,
  MapDistance,
  PetHandled,
  ProviderProfileFeaturedSVG,
  Reviews,
} from '../../../../../../assets/svgs/Services_SVG';
import TitleText from '../../../../../common/text/TitleText';
import ShortText from '../../../../../common/text/ShortText';
import Text_Size from '../../../../../../constants/textScaling';
import Colors from '../../../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../../../constants/WindowSize';
import {useAppSelector} from '../../../../../../store/store';

const ProviderProfileFeature = () => {
  const {featured} = useAppSelector(state => state.providerProfile);
  const infos = [
    {
      Icon: MapDistance,
      title: 'Distance',
      value: `${featured?.distance ? featured.distance : 0} km`,
    },
    {
      Icon: Experience,
      title: 'Experience',
      value: `${featured?.experience ? featured.experience : 0} years`,
    },
    {
      Icon: PetHandled,
      title: 'Pet Handled',
      value: `${featured?.petHandled ? featured?.petHandled : 0} `,
    },
    {
      Icon: Reviews,
      title: 'Reviews',
      value: `${featured?.reviewsCount ? featured?.reviewsCount : 0} `,
    },
  ];
  console.log('featured', featured);
  return (
    <View style={styles.container}>
      <ProviderProfileFeaturedSVG
        width={'100%'}
        height={SCREEN_WIDTH > 800 ? 290 : 216}
      />
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title} text="Featured" />
        <View>
          <FlatList
            data={infos}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.valueContainer}>
                <View style={styles.iconContainer}>
                  <item.Icon fill={'black'} />
                </View>
                <View>
                  <TitleText textStyle={styles.value} text={item.value} />
                  <ShortText textStyle={styles.shortText} text={item.title} />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ProviderProfileFeature;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 3,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: SCREEN_WIDTH > 800 ? 20 : 10,
  },
  title: {
    fontSize: SCREEN_WIDTH > 800 ? Text_Size.Text_1 : Text_Size.Text_0,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  value: {
    fontSize: Text_Size.Text_0,
    color: Colors.text,
    fontWeight: 'bold',
  },

  shortText: {
    color: Colors.text,
  },
  textContainer: {
    position: 'absolute',
    top: SCREEN_WIDTH > 800 ? '25%' : '18%',
    left: 30,
  },
});

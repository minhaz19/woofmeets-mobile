import {StyleSheet, View} from 'react-native';
import React from 'react';
import SitterInfo from './components/SitterInfo';
import SitterMap from './components/SitterMap';
import SitterPets from './components/SitterPets';
import TitleText from '../../../../../../common/text/TitleText';
import {useAppSelector} from '../../../../../../../store/store';

const Overview = () => {
  const {overview, profileInfo} = useAppSelector(
    state => state.providerProfile,
  );

  const providerDatas = [
    {
      title: `${profileInfo?.firstName + ' ' + profileInfo?.lastName} home 🏡`,
      viewAll: 'View All',
      subInfo: overview?.sittersHome?.homeAttributes.map((item: any) => ({
        info: item.homeAttributeType?.displayName,
      })),
    },
    {
      title: `${
        profileInfo?.firstName + ' ' + profileInfo?.lastName
      }  skills 🤹‍♀️`,
      viewAll: 'View All',
      subInfo: overview?.skills.lenght === 0 ? [] : overview.skills,
    },
    {
      title: 'About',
      subInfo: [
        {
          description: overview?.about
            ? overview.about
            : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et Show More',
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        {providerDatas.map((item, index) => (
          <SitterInfo key={index} item={item} />
        ))}
        <SitterMap />
        <View>
          <TitleText textStyle={styles.petTitle} text="Pets" />

          {overview?.pastCLients?.length === 0 ? (
            <TitleText text={'No past client found'} />
          ) : (
            overview?.pastCLients?.map((_: any, i: number) => (
              <SitterPets key={i} />
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {},
  petTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

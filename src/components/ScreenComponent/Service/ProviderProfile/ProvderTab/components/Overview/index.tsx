import {StyleSheet, View} from 'react-native';
import React from 'react';
import {HomeSvg} from '../../../../../../../assets/svgs/SVG_LOGOS';
import SitterInfo from './components/SitterInfo';
import SitterMap from './components/SitterMap';

const Overview = () => {
  const providerDatas = [
    {
      title: 'Steve Goodman home',
      Icon: HomeSvg,
      viewAll: 'View All',
      subInfo: [
        {
          info: 'Lives in an apartment',
        },
        {
          info: 'Non smoking household',
        },
        {
          info: 'has Cats',
        },
        {
          info: 'Does not have a yard',
        },
        {
          info: 'No children presents',
        },
      ],
    },
    {
      title: 'In your home',
      Icon: HomeSvg,
      subInfo: [
        {
          info: 'Dogs over 1 year old',
        },
      ],
    },
    {
      title: 'Steve Goodman skills',
      Icon: HomeSvg,
      viewAll: 'View All',
      subInfo: [
        {
          info: 'Senior dog experience',
        },
        {
          info: 'Injection medication administration',
        },
      ],
    },
    {
      title: 'About',
      subInfo: [
        {
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et Show More',
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
      </View>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {},
});

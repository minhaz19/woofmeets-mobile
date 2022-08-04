import {StyleSheet, View} from 'react-native';
import React from 'react';
import SitterInfo from './components/SitterInfo';
import SitterMap from './components/SitterMap';
import SitterPets from './components/SitterPets';
import TitleText from '../../../../../../common/text/TitleText';
import {providerDatas} from '../../../../../../../utils/config/Data/ProviderProfileDatas';

const Overview = () => {
  return (
    <View style={styles.container}>
      <View>
        {providerDatas.map((item, index) => (
          <SitterInfo key={index} item={item} />
        ))}
        <SitterMap />
        <View>
          <TitleText textStyle={styles.petTitle} text="Pets" />

          {[1, 2, 3, 4, 5].map((_, i) => (
            <SitterPets key={i} />
          ))}
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

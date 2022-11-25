/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import Overview from './components/Overview';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Colors from '../../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';

const tabs = [
  {
    tab: 'Overview',
  },
  {
    tab: 'Services',
  },
  {
    tab: 'Reviews',
  },
];
const ProviderTab = (props: {providerOpk: string}) => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => setActive(index)}>
            <TitleText
              key={index}
              text={tab.tab}
              textStyle={{
                fontWeight: 'bold',
                fontSize:
                  SCREEN_WIDTH > 800 ? Text_Size.Text_1 : Text_Size.Text_0,
                color: active === index ? Colors.black : Colors.gray,
              }}
            />
            {active === index && <View style={styles.activeLabel} />}
          </TouchableOpacity>
        ))}
      </View>
      {active === 0 && <Overview />}
      {active === 1 && <Services providerOpk={props.providerOpk} />}
      {active === 2 && <Reviews />}
    </View>
  );
};

export default ProviderTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 5,
  },
  activeLabel: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    height: 3,
    borderRadius: 100,
    marginTop: SCREEN_WIDTH > 800 ? 4 : 2,
  },
});

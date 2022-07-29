import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import ServiceHeader from '../../common/ServiceHeader';
import ServiceLocation from '../../common/ServiceLocation';
import ServicePetType from '../../common/ServicePetType';
import {petType} from '../../utils/petType';
import Text_Size from '../../../../../constants/textScaling';
import BottomButton from '../../BottomButton';
import HeaderText from '../../../../common/text/HeaderText';
import ServiceDate from '../../common/ServiceDate';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type StackParamList = {
  AllProvider: {foo: string; onBar: () => void} | undefined;
};
type NavigationProps = StackNavigationProp<StackParamList>;
const HouseSitting = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <ServiceHeader
          hText={'House Sitting'}
          dText={'When do you need sitter?'}
        />
        <ServiceDate hText="Dates" />
        <ServiceLocation
          hText={'Your location'}
          dText={'Enter a date to find someone faster'}
        />
        <HeaderText textStyle={styles.text} text={'Pet Type (s)'} />
        <View style={styles.petTypeContainer}>
          {petType.map((item, index) => {
            return <ServicePetType key={index} title={item.type} radio />;
          })}
        </View>
      </ScrollView>
      <BottomButton
        title="Next"
        onSelect={() => navigation.navigate('AllProvider')}
      />
    </View>
  );
};

export default HouseSitting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    bottom: '10%',
  },
  petTypeContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    fontSize: Text_Size.Text_9,
    marginTop: 20,
  },
});

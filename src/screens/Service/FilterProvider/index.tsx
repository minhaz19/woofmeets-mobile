import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../components/common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import FilterProviderBody from '../../../components/ScreenComponent/Service/FilterProvider/FilterProviderBody';
import {filterProviderValue} from '../../../utils/config/initalValues';
import {filterProviderValidationSchema} from '../../../utils/config/validationSchema';
const FilterProvider = () => {
  const handleSubmit = (e: {}) => {
    console.log('values', e);
  };
  return (
    <View>
      <View style={styles.textContainer}>
        <TitleText textStyle={styles.title1} text="Filter" />
        <TitleText textStyle={styles.title2} text="reset" />
      </View>
      <View>
        <FilterProviderBody
          initialValues={filterProviderValue}
          validationSchema={filterProviderValidationSchema}
          handleSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

export default FilterProvider;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title1: {fontSize: Text_Size.Text_1, fontWeight: 'bold'},
  title2: {fontSize: Text_Size.Text_1, color: Colors.primary},
});

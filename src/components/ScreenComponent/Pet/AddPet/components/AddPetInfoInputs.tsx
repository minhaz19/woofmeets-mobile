/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
import AppSelect from '../../../../common/Form/AppSelect';
import {addPetInfoInputs} from '../../../../../utils/config/Data/AddPetData';
interface Props {
  errors: any;
  control: any;
}
const AddPetInfoInputs = ({errors, control}: Props) => {

  return (
    <View style={styles.flatList}>
      {addPetInfoInputs.map(
        useCallback(
          (item, index) => (
            <View key={index} style={{width: item.flex ? '48%' : '100%'}}>
              {!item.select ? (
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType={'default'}
                  placeholder={item.placeholder}
                  textContentType={'none'}
                  name={item.name}
                  label={item.title}
                  flex={item.flex}
                  key={index}
                  errors={errors}
                  control={control}
                />
              ) : (
                <View style={styles.selectContainer} key={index}>
                  <AppSelect label={item.title} name={item.name} />
                </View>
              )}
            </View>
          ),
          [control, errors],
        ),
      )}
    </View>
  );
};

export default AddPetInfoInputs;

const styles = StyleSheet.create({
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selectContainer: {width: '100%'},
});

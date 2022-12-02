/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import {
  addPetInfoInputs,
  genders,
} from '../../../../utils/config/Data/AddPetData';
import AppSelectField from '../../../common/Form/AppSelectField';
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
                  keyboardType={item.number ? 'numeric' : 'default'}
                  placeholder={item.placeholder}
                  textContentType={'none'}
                  name={item.name}
                  label={item.title}
                  key={index}
                  errors={errors}
                  control={control}
                />
              ) : (
                <View style={styles.selectContainer} key={index}>
                  <AppSelectField
                    placeholder="Select Gender"
                    label={item.title}
                    name={item.name}
                    data={genders}
                    control={control}
                  />
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

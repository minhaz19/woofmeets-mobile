/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
import AppSelect from '../../../../common/Form/AppSelect';
import {addPetInfoInputs} from '../../../../../utils/config/Data/AddPetData';
interface Props {
  errors: any;
  control: any;
}
const AddPetInfoInputs = ({errors, control}: Props) => {
  console.log('calling from input comp');
  return (
    <View style={styles.flatList}>
      {addPetInfoInputs.map((item, index) => (
        <>
          {!item.select ? (
            <View key={index} style={{width: item.flex ? '48%' : '100%'}}>
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
            </View>
          ) : (
            <View style={styles.selectContainer} key={index}>
              <AppSelect label={item.title} name={item.name} />
            </View>
          )}
        </>
      ))}
    </View>
  );
};
// const areEqual = (prevProps: any, nextProps: any) => {
//   console.log(
//     'is it true',
//     prevProps.name,
//     nextProps.name,
//     prevProps.methods.watch(prevProps.name) ===
//       nextProps.methods.watch(nextProps.name),
//   );
//   return (
//     prevProps.methods.watch(prevProps.name) ===
//     nextProps.methods.watch(nextProps.name)
//   );
// };

export default memo(AddPetInfoInputs);

const styles = StyleSheet.create({
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  selectContainer: {width: '100%'},
});

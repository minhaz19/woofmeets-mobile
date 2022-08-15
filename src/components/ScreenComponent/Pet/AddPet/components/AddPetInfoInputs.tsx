import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import AppFormField from '../../../../common/Form/AppFormField';
import AppSelect from '../../../../common/Form/AppSelect';
import {addPetInputs} from '../../../../../utils/config/Data/AddPetData';
interface Props {
  methods: any;
}
const AddPetInfoInputs = ({methods}: Props) => {
  console.log('calling from input comp');
  return (
    <View style={styles.flatList}>
      {addPetInputs[1].inputs!.map((item, index) => (
        <>
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
              methods={methods}
            />
          ) : (
            <View style={styles.selectContainer} key={index}>
              <AppSelect
                label={item.title}
                name={item.name}
                methods={methods}
              />
            </View>
          )}
        </>
      ))}
    </View>
  );
};
const areEqual = (prevProps: any, nextProps: any) => {
  console.log(
    'is it true',
    prevProps.name,
    nextProps.name,
    prevProps.methods.watch(prevProps.name) ===
      nextProps.methods.watch(nextProps.name),
  );
  return (
    prevProps.methods.watch(prevProps.name) ===
    nextProps.methods.watch(nextProps.name)
  );
};

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

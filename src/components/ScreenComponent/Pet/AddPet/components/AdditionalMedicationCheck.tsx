import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {medicationChecks} from '../../../../../utils/config/Data/AddPetData';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import AppFormField from '../../../../common/Form/AppFormField';
import {useHandleMultiCheck} from '../../../../../utils/helpers/useHandleMultiCheck';

interface Props {
  errors: any;
  setValue: any;
  control: any;
  getValues: any;
}
const AdditionalMedicationCheck = ({
  errors,
  setValue,
  getValues,
  control,
}: Props) => {
  const {newData, handleMultipleCheck} = useHandleMultiCheck(
    medicationChecks.pet,
  );
  const data = getValues();
  return (
    <View>
      <TitleText textStyle={styles.title} text={medicationChecks.title!} />
      <View style={styles.petType}>
        {newData.map((item: any, index: number) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            square
            active={data[item.name]}
            name={item.name}
            errors={errors}
            control={control}
            onPress={() => {
              handleMultipleCheck(index);
              setValue(item.name, item.active);
            }}
          />
        ))}
      </View>
      {medicationChecks.input.map(
        (item, index) =>
          data[item.id] === true && (
            <AppFormField
              key={index}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              placeholder={item.placeholder}
              textContentType={'none'}
              name={item.name}
              label={item.title}
              errors={errors}
              control={control}
            />
          ),
      )}
    </View>
  );
};

export default memo(AdditionalMedicationCheck);

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  petType: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});

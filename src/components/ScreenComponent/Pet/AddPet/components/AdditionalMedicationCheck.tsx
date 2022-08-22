import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {medicationChecks} from '../../../../../utils/config/Data/AddPetData';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  active12: number | null;
  handleActiveCheck: (arg0: number, arg1: number) => void;
  errors: any;
  setValue: any;
  control: any;
}
const AdditionalMedicationCheck = ({
  errors,
  setValue,
  control,
  active12,
  handleActiveCheck,
}: Props) => {
  return (
    <View>
      <TitleText textStyle={styles.title} text={medicationChecks.title!} />
      <View style={styles.petType}>
        {medicationChecks.pet!.map((item, index) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            square
            typeKey={item.id}
            active={item.id === active12 ? true : false}
            name={medicationChecks.name!}
            errors={errors}
            setValue={setValue}
            control={control}
            onPress={() => handleActiveCheck(112, item.id)}
          />
        ))}
      </View>
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

import {StyleSheet, View} from 'react-native';
import React, { memo } from 'react';
import {addPetInputs} from '../../../../../utils/config/Data/AddPetData';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  methods: any;
  active12: number | null;
  handleActiveCheck: (arg0: number, arg1: number) => void;
}
const AdditionalMedicationCheck = ({
  methods,
  active12,
  handleActiveCheck,
}: Props) => {
  return (
    <View>
      <TitleText textStyle={styles.title} text={addPetInputs[6].title!} />
      <View style={styles.petType}>
        {addPetInputs[6].pet!.map((item, index) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            square
            typeKey={item.id}
            active={item.id === active12 ? true : false}
            name={addPetInputs[6].name!}
            methods={methods}
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

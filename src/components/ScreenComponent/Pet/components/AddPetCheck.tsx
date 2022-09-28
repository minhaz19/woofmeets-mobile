/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';
import TitleText from '../../../common/text/TitleText';
import AppCheckboxField from '../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../constants/textScaling';
import {addPetCheck1} from '../../../../utils/config/Data/AddPetData';

interface Props {
  errors: any;
  control: any;
  setValue: any;
}
const AddPetCheck = ({errors, control, setValue}: Props) => {
  return (
    <View>
      <HeaderText textStyle={styles.header} text={addPetCheck1.header!} />
      <DescriptionText
        textStyle={styles.topSubTitle}
        text={addPetCheck1.subTitle!}
      />
      <TitleText textStyle={styles.title} text={addPetCheck1.title!} />
      <View style={styles.petType}>
        {addPetCheck1.pet.map((item, index) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            typeKey={item.id}
            square
            name={addPetCheck1.name!}
            typeValue={item.value}
            onPress={() => {
              setValue(addPetCheck1.name, item.value, {
                shouldValidate: true,
              });
            }}
            errors={errors}
            control={control}
          />
        ))}
      </View>
    </View>
  );
};

export default AddPetCheck;

const styles = StyleSheet.create({
  topHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
  },
  topSubTitle: {
    marginTop: 4,
    marginBottom: 14,
  },
  inputContainer: {paddingHorizontal: 20, flex: 1},
  petType: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});

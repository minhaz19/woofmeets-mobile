import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import HeaderText from '../../../../common/text/HeaderText';
import DescriptionText from '../../../../common/text/DescriptionText';
import TitleText from '../../../../common/text/TitleText';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import Text_Size from '../../../../../constants/textScaling';
import {addPetCheck1} from '../../../../../utils/config/Data/AddPetData';

interface Props {
  errors: any;
  control: any;
  setValue: any;
  active0: number | null;
  handleActiveCheck: (arg: number, arg2: number) => void;
}
const AddPetCheck = ({
  errors,
  control,
  setValue,
  active0,
  handleActiveCheck,
}: Props) => {
  return (
    <View>
      <HeaderText textStyle={styles.header} text={addPetCheck1.header!} />
      <DescriptionText
        textStyle={styles.topSubTitle}
        text={addPetCheck1.subTitle!}
      />
      <TitleText textStyle={styles.title} text={addPetCheck1.title!} />
      <View style={styles.petType}>
        {addPetCheck1.pet!.map((item, index) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            typeKey={item.id}
            square
            active={active0 === item.id ? true : false}
            name={addPetCheck1.name!}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            onPress={useCallback(() => {
              handleActiveCheck(addPetCheck1.id!, item.id);
              setValue(addPetCheck1.name, item.id, {
                shouldValidate: errors[addPetCheck1.name] ? true : false,
              });
            }, [item.id])}
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
    fontSize: 10,
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

import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import HeaderText from '../../../../common/text/HeaderText';
import DescriptionText from '../../../../common/text/DescriptionText';
import TitleText from '../../../../common/text/TitleText';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import {addPetInputs} from '../../../../../utils/config/Data/AddPetData';
import Text_Size from '../../../../../constants/textScaling';

interface Props {
  methods: any;
  active0: number | null;
  handleActiveCheck: (arg: number, arg2: number) => void;
}
const AddPetCheck = ({ methods, active0, handleActiveCheck }: Props) => {
  console.log('calling pet check');
  return (
    <View>
      <HeaderText textStyle={styles.header} text={addPetInputs[0].header!} />
      <DescriptionText
        textStyle={styles.topSubTitle}
        text={addPetInputs[0].subTitle!}
      />
      <TitleText textStyle={styles.title} text={addPetInputs[0].title!} />
      <View style={styles.petType}>
        {addPetInputs[0].pet!.map((item, index) => (
          <AppCheckboxField
            title={item.type}
            key={index}
            typeKey={item.id}
            square
            active={active0 === item.id ? true : false}
            name={addPetInputs[0].name!}
            onPress={() => {
              handleActiveCheck(addPetInputs[0].id!, item.id);
            }}
            methods={methods}
          />
        ))}
      </View>
    </View>
  );
};

export default memo(AddPetCheck);

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

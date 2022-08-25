import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderText from '../../common/text/HeaderText';
import DescriptionText from '../../common/text/DescriptionText';
import BoardingCheckbox from './Common/BoardingCheckbox';
import ErrorMessage from '../../common/Form/ErrorMessage';
import {petPreference} from './utils/BoardingData/BoardingData';

interface Props {
  activePetHosting: any;
  handlePetHostingActiveCheck: (arg1: number, arg2: any) => void;
  errors: any;
  control: any;
  setValue: (arg1: string, arg2: any, arg3: any) => void;
}

const PetPreference = ({
  activePetHosting,
  handlePetHostingActiveCheck,
  control,
  errors,
  setValue,
}: Props) => {
  const handleValues = (id: number) => {
    handlePetHostingActiveCheck(id, petPreference[0].options);
    if (activePetHosting.activeItem) {
      setValue(petPreference[0].name!, activePetHosting.activeItem, {
        shouldValidate: true,
      });
    }
  };

  return (
    <View>
      <HeaderText textStyle={styles.subtitle} text={petPreference[0].title!} />
      <DescriptionText
        text={petPreference[0].subtitle}
        textStyle={styles.subtitle}
      />
      {petPreference[0].options.map((item, index) => {
        return (
          <BoardingCheckbox
            title={item.type}
            key={index}
            square
            typeKey={activePetHosting.activeItem}
            active={item.checked}
            // onPress={() =>
            //   handlePetHostingActiveCheck(item.id, petPreference[0].options)
            // }
            name={petPreference[0].name!}
            control={control}
            setValue={setValue}
            handleValues={() => handleValues(item.id)}
          />
        );
      })}
      <ErrorMessage error={errors[petPreference[0].name!]?.message} />
    </View>
  );
};

export default PetPreference;

const styles = StyleSheet.create({
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
  },
});

import {View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../../store/store';
import AppMultiSelectField from '../../../common/Form/AppMultiSelectField';
interface Props {
  name: string;
  control: any;
  setValue: any;
  getValues: any;
}
const AddPetBreeds = ({name, control, setValue, getValues}: Props) => {
  const {dogBreeds, catBreeds} = useAppSelector(state => state?.petBreeds);
  const breedId = getValues('type');
  return (
    <View>
      <AppMultiSelectField
        title="Breeds"
        name={name}
        control={control}
        setValue={setValue}
        placeholder="Select Breeds"
        data={
          breedId === 'DOG' ? dogBreeds : breedId === 'CAT' ? catBreeds : []
        }
      />
    </View>
  );
};

export default AddPetBreeds;

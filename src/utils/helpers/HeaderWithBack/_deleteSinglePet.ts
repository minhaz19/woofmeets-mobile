import {Alert} from 'react-native';
import methods from '../../../api/methods';
import {getAllPets} from '../../../store/slices/pet/allPets/allPetsAction';
import {updatePets} from '../../../store/slices/pet/allPets/allPetsSlice';
import {removeSinglePet} from '../../../store/slices/pet/singlePet/singlePetSlice';
const slug = '/pet/delete/';
export const _deleteSinglePet = (
  dispatch: any,
  navigation: any,
  route: any,
) => {
  Alert.alert('Delete', 'Are you sure you want to delete this image', [
    {
      text: 'No',
    },
    {
      text: 'Yes',
      onPress: async () => {
        const response = await methods._delete(`${slug + route.params!.opk}`);
        if (response.ok) {
          dispatch(removeSinglePet());
          dispatch(updatePets());
          await dispatch(getAllPets());
          navigation.navigate('MyPet');
        }
      },
    },
  ]);
};

import {addPetApi} from './addPetApi';
import {getAllPets} from '../../../../../store/slices/pet/allPets/allPetsAction';
import {useAppDispatch} from '../../../../../store/store';
import {useApi} from '../../../../../utils/helpers/api/useApi';
import methods from '../../../../../api/methods';
const endpoint = '/user-profile/check-have-pets';
export const useAddPetUtils = (
  navigation: any,
  routeData: any,
  opk: string | null,
) => {
  const dispatch = useAppDispatch();
  const {request, loading: Ploading} = useApi(addPetApi);

  const handleSubmit = async (data: any) => {
    const payload = {...data, ...routeData};
    const result = await request(payload, opk);
    if (result.ok) {
      navigation.navigate('MyPet');
      dispatch(getAllPets());
      const checkPetPayload = {havePets: 'YES'};
      await methods._post(endpoint, checkPetPayload);
    }
  };

  return {Ploading, handleSubmit};
};
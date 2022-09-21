import {useEffect} from 'react';
import {addPetApi} from './addPetApi';
import {getAllPets} from '../../../../store/slices/pet/allPets/allPetsAction';
import {getBreeds} from '../../../../store/slices/pet/breeds/breedsAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
const endpoint = '/user-profile/check-have-pets';
export const useAddPetUtils = (navigation: any, opk: string) => {
  const dispatch = useAppDispatch();
  const {loading, dogBreeds, catBreeds} = useAppSelector(
    state => state.petBreeds,
  );
  const {request, loading: Ploading} = useApi(addPetApi);

  const handleSubmit = async (data: any) => {
    const result = await request(data, opk);
    if (result.ok) {
      navigation.goBack();
      dispatch(getAllPets());
      const checkPetPayload = {havePets: 'YES'};
      await methods._post(endpoint, checkPetPayload);
    }
  };

  useEffect(() => {
    dogBreeds === null && catBreeds === null && dispatch(getBreeds());
  }, [catBreeds, dispatch, dogBreeds]);
  return {loading, Ploading, handleSubmit};
};

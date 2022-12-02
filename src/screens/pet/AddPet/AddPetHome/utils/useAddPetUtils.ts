import {useEffect} from 'react';
import {getBreeds} from '../../../../../store/slices/pet/breeds/breedsAction';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
export const useAddPetUtils = (
  navigation: any,
  opk: any,
  onBoarding: boolean,
) => {
  const dispatch = useAppDispatch();
  const {loading, dogBreeds, catBreeds} = useAppSelector(
    state => state.petBreeds,
  );

  const handleSubmit = async (data: any) => {
    navigation.navigate('AddPetCheck', {
      opk: opk,
      homeData: data,
      onBoarding: onBoarding,
    });
  };

  useEffect(() => {
    dogBreeds === null && catBreeds === null && dispatch(getBreeds());
  }, [catBreeds, dispatch, dogBreeds]);
  return {loading, handleSubmit};
};

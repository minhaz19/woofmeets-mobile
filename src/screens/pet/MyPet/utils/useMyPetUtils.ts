/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useTimeoutAlert} from '../../../../components/common/Alert/timeoutAlert';
import {getAllPets} from '../../../../store/slices/pet/allPets/allPetsAction';
import {getSinglePet} from '../../../../store/slices/pet/singlePet/signlePetAction';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

export const useMyPetUtils = (navigation: any) => {
  const dispatch = useAppDispatch();
  const {pets, loading} = useAppSelector(state => state.allPets);
  const {loading: singlePetLoading} = useAppSelector(state => state.singlePet);
  const [petList, setPetList] = useState<any>([]);
  const {timeoutAlert} = useTimeoutAlert();
  const onPress = async (id: number, opk?: string) => {
    if (id === 1) {
      const data = await dispatch(getSinglePet(opk!));

      timeoutAlert(data, getSinglePet, opk);
      data.payload.ok === false || data === undefined
        ? null
        : navigation.navigate('AddPetHome', {opk: opk!});
    } else {
      navigation.navigate('AddPetHome', {opk: null});
    }
  };
  const callApi = async () => {
    const data = await dispatch(getAllPets());
    timeoutAlert(data, getAllPets);
  };
  useEffect(() => {
    if (pets === null) {
      callApi();
      setPetList([]);
    } else if (pets !== null && pets !== undefined) {
      const newPets = [...pets];
      newPets.push({type: 'pet'});
      setPetList(newPets);
    }
  }, [pets]);

  return {loading, singlePetLoading, onPress, petList};
};

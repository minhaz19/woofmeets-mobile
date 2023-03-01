import {useNavigation} from '@react-navigation/native';
import {ApiResponse} from 'apisauce';
import {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import apiClient from '../../../../api/client';
import {
  getServiceTypes,
  getUserServices,
} from '../../../../store/slices/profile/services';
import {useAppDispatch, useAppSelector} from '../../../../store/store';

export const useNewServiceSelect = () => {
  const [sequence, setSequence] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {user} = useAppSelector((state: any) => state.whoAmI);
  const dispatch = useAppDispatch();
  const onPressEvent = (id: number) => {
    setSequence(id);
  };

  const onServicePostHandle = async () => {
    if (sequence) {
      setLoading(true);
      try {
        const response: ApiResponse<any> = await apiClient.post(
          `/provider-services/${sequence}`,
        );
        if (!response.ok) {
          setLoading(false);
          Alert.alert(response.data.message);
          throw new Error(response.data.message);
        }
        if (response.ok) {
          setLoading(false);
          if (user && user?.provider?.isApproved) {
            dispatch(getUserServices());
            navigation.goBack();
          } else {
            dispatch(getUserServices());
            navigation.navigate('ServiceSetupFlow');
          }
        }
      } catch (er: any) {
        if (er.response && er.response.data.message) {
        }
        setLoading(false);
      }
    } else {
      Alert.alert('Service', 'Please, select a service');
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getServiceTypes());
    setRefreshing(false);
  }, [dispatch]);

  return {
    isLoading,
    refreshing,
    sequence,
    onRefresh,
    onPressEvent,
    onServicePostHandle,
  };
};

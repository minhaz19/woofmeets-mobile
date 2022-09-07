import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useAppDispatch} from '../../../store/store';

export const useTimeoutAlert = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const timeoutAlertFunc = (arg: any, id?: any) => {
    Alert.alert(
      'Response Timeout',
      'would you like to retry?',
      [
        {
          text: 'No',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Yes',
          onPress: async () => await dispatch(id ? arg(id) : arg()),
        },
      ],
      {cancelable: false},
    );
  };
  const timeoutAlert = (data: any, dipatchFunc: any, id?: any) => {
    if (data && data?.payload?.problem === 'TIMEOUT_ERROR') {
      timeoutAlertFunc(dipatchFunc, id);
    }
  };
  return {timeoutAlert};
};

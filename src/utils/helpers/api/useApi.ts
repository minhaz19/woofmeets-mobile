// import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';

export const useApi = (apiFunc: any, alert?: string) => {
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    const response = await apiFunc(...args);
    if (response.problem === 'CANCEL_ERROR' || response === undefined) {
      return;
    }
    if (!response.ok) {
      setLoading(false);
      if (response.status === 400 || response.status === 404) {
        // Alert.alert(response.data.message);
        null;
      } else if (response.status === 500) {
        Alert.alert('Something went wrong! please try again later');
      } else if (response.problem === 'TIMEOUT_ERROR') {
        Alert.alert('Response Timeout! Go back and try again');
      } else if (response.status === 402) {
        Alert.alert(response.data.message);
      } else {
        alert === 'STOP' ? null : Alert.alert('An unexpected error occurred.');
      }
      setError(response.data);
    }
    if (response.ok) {
      setData(response.data);
      setLoading(false);
    }
    return response;
  };

  return {data, error, loading, request};
};

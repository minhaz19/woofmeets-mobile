import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert} from 'react-native';

export const useApi = (apiFunc: any) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    if (!response.ok) {
      if (response.status === 400 || response.status === 404) {
        // Alert.alert(response.data.message);
        null;
      } else if (response.status === 500) {
        Alert.alert('Something went wrong! please try again later');
      } else if (response.problem === 'TIMEOUT_ERROR') {
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
              onPress: async () => await request(...args),
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert('An unexpected error occurred.');
      }
      setError(response.data);
    }
    if (response.ok) {
      setData(response.data);
    }
    return response;
  };

  return {data, error, loading, request};
};

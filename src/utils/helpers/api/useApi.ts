import {useState} from 'react';
import {Alert} from 'react-native';

export const useApi = (apiFunc: any) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);
    if (!response.ok) {
      if (response.status === 400) {
        Alert.alert(response.data.message);
      } else if (response.status === 500) {
        Alert.alert('Something went wrong! please try again later');
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

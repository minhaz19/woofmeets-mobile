import {useEffect, useState} from 'react';
import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';

const getEndPoint = '/provider-home';
const getAttributesEndpoint = '/provider-home/attributue-title-types';
export const useYourHomeUtils = () => {
  const [homeData, yourHomeData] = useState({});
  const [attributes, setAttributes] = useState([]);
  const {request: getRequest, loading: getLoading} = useApi(methods._get);

  const handleGetResponse = async () => {
    const result = await getRequest(getEndPoint);
    yourHomeData(result?.data?.data);
  };
  const handleGetAttributes = async () => {
    const result = await getRequest(getAttributesEndpoint);
    setAttributes(result?.data?.data);
  };
  useEffect(() => {
    handleGetResponse();
    handleGetAttributes();
  }, []);
  return {homeData, getLoading, attributes};
};

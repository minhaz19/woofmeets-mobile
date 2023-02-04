import {useEffect} from 'react';
import {
  getAttributesPreference,
  getSkillsData,
  getUserDetailsPreference,
} from '../../../../../store/slices/profile/details';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';

// const getAttributesEndpoint = '/provider-home/attributue-title-types';
export const useDetailsUtils = () => {
  const dispatch = useAppDispatch();
  //   const {attributes, skillsData} = useAppSelector(state => state.details);
  //   const [attributes, setAttributes] = useState([]);
  //   const {request: getRequest, loading: getLoading} = useApi(methods._get);

  //   const handleGetAttributes = async () => {
  //     const result = await getRequest(getAttributesEndpoint);
  //     setAttributes(result?.data?.data);
  //   };
  useEffect(() => {
    // dispatch(getUserDetailsPreference()).then(() => {
    // setTimeout(async () => {
    dispatch(getUserDetailsPreference());
    dispatch(getAttributesPreference());
    dispatch(getSkillsData());
    //   });
    // });
  }, []);

  return {};
};

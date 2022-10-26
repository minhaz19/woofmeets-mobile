import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../../components/common/Form/AppForm';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import SubYourHome from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubYourHome';
import {useYourHomeUtils} from './utils/useYourHomeUtils';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {setBoardingSelection} from '../../../../store/slices/onBoarding/initial';
import {useApi} from '../../../../utils/helpers/api/useApi';
import methods from '../../../../api/methods';
import {useYourHomeInitialData} from './utils/useYourHomeInitialData';
import {setYourHome} from '../../../../store/slices/onBoarding/setUpService/yourHome/yourHomeSlice';

const postEndPoint = '/provider-home';

const YourHome = () => {
  const {colors} = useTheme();
  const {serviceSetup} = useAppSelector((state: any) => state?.serviceSetup);
  const {yourHome} = useAppSelector((state: any) => state?.yourHome);
  const {itemId, name, image, description} = serviceSetup.routeData;
  const {getLoading, attributes} = useYourHomeUtils();
  const dispatch = useAppDispatch();
  const YouHomeSchema = Yup.object().shape({
    homeType: Yup.string().required('Please select one'),
    yardType: Yup.string().required('Please select one'),
    homeAttributes: Yup.array().min(1).required('Please select one').nullable(),
  });
  const {request, loading} = useApi(methods._post);
  const handlePost = async (e: any) => {
    const result = await request(postEndPoint, e);
    if (result?.ok) {
      dispatch(setYourHome(result?.data?.data));
      dispatch(setBoardingSelection({pass: 3}));
    }
  };
  return (
    <>
      {getLoading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}
        showsVerticalScrollIndicator={false}>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <AppForm
          initialValues={useYourHomeInitialData(yourHome)}
          validationSchema={YouHomeSchema}>
          <SubYourHome
            handlePost={handlePost}
            postLoading={loading}
            attributes={attributes}
          />
        </AppForm>
      </ScrollView>
    </>
  );
};

export default YourHome;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

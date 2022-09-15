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

const YourHome = () => {
  const {colors} = useTheme();
  // const {itemId, name, image, description} = props?.route?.params;

  const {serviceSetup} = useAppSelector(state => state?.serviceSetup);
  const {itemId, name, image, description} = serviceSetup.routeData;
  const {getLoading, attributes} = useYourHomeUtils();
  const dispatch = useAppDispatch();
  const YouHomeSchema = Yup.object().shape({
    homeType: Yup.string().required('Please select one'),
    yardType: Yup.string().required('Please select one'),
    expect: Yup.array().required('Please select one').nullable(),
    host: Yup.array().required('Please select one').nullable(),
  });
  const YourHomeInitialValue = {
    homeType: '',
    yardType: '',
    expect: [],
    host: [],
  };
  const handlePost = () => {
    dispatch(setBoardingSelection({pass: 3}));
  };
  return (
    <>
      {getLoading && <AppActivityIndicator visible={true} />}
      <ScrollView
        style={[
          styles.rootContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <ReusableHeader
          itemId={itemId}
          name={name}
          image={image}
          description={description}
        />
        <AppForm
          initialValues={YourHomeInitialValue}
          validationSchema={YouHomeSchema}>
          <SubYourHome
            handlePost={handlePost}
            // postLoading={undefined}
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

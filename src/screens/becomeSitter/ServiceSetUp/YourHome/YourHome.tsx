import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import ReusableHeader from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/ReusableHeader';
import AppForm from '../../../../components/common/Form/AppForm';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import SubYourHome from '../../../../components/ScreenComponent/becomeSitter/ServiceSetup/SubYourHome';
import {useYourHomeUtils} from './utils/useYourHomeUtils';
import AppActivityIndicator from '../../../../components/common/Loaders/AppActivityIndicator';

const YourHome = (props: {
  navigation: {navigate: (arg0: string, arg1: any) => void};
  route: {params: any};
}) => {
  const {colors} = useTheme();
  const {itemId, name, image, description} = props?.route?.params;

  const {homeData, getLoading, attributes} = useYourHomeUtils();
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
  const handlePost = (e: any) => {
    console.log(e);
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

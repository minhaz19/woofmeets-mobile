import {RefreshControl, StyleSheet} from 'react-native';
import React from 'react';
import AppActivityIndicator from '../../../../../components/common/Loaders/AppActivityIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../../../../constants/Colors';
import AppForm from '../../../../../components/common/Form/AppForm';
import ProfileSetupBody from '../../../../../components/ScreenComponent/becomeSitter/serviceSelection/ProfileSetupBody';
import {useProfileSetup} from './utils/useProfileSetup';
// import {profileSetupInit} from '../../../../../utils/config/initalValues/initalValues';
import {profileSetupValidationSchema} from '../../../../../utils/config/ValidationSchema/validationSchema';
import {useProfileSetupInit} from './utils/useProfileSetupInit';
import BottomSpacing from '../../../../../components/UI/BottomSpacing';

const ProfileSetup = () => {
  const {onRefresh, refreshing, handleSubmit, putLoading, postLoading, onboardingLoading, locationLoading} =
    useProfileSetup();
  const initialValue = useProfileSetupInit();
  return (
    <>
      {onboardingLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={[
            styles.rootContainer,
            {
              backgroundColor: Colors.background,
            },
          ]}
          extraHeight={100}
          extraScrollHeight={200}
          enableAutomaticScroll={true}
          enableOnAndroid={true}>
          <AppForm
            initialValues={initialValue}
            validationSchema={profileSetupValidationSchema}>
            <ProfileSetupBody
              handleSubmit={handleSubmit}
              isLoading={putLoading || postLoading || locationLoading}
            />
          </AppForm>
          <BottomSpacing />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    // flex: 1,
  },
});

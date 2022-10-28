import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import AppForm from '../../../components/common/Form/AppForm';
import ModifyRequestBody from '../../../components/ScreenComponent/Inbox/ModifyAppointment/ModifyRequestBody';
import {appointmentModifyValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {useModReqInitialState} from './utils/useModReqInitalState';
import {useModifyAppointment} from './utils/useModifyAppointment';
interface Props {
  route: any;
  navigation: any;
}

const ModifyAppointment = ({route}: Props) => {
  const {colors} = useTheme();
  const {loading, handleSubmit} = useModifyAppointment(route);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <AppForm
        initialValues={useModReqInitialState()}
        validationSchema={appointmentModifyValidationSchema}
        enableReset>
        <ModifyRequestBody handleSubmit={handleSubmit} loading={loading} />
      </AppForm>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default ModifyAppointment;

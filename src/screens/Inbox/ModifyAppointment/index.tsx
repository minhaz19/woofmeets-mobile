import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import AppForm from '../../../components/common/Form/AppForm';
import ModifyRequestBody from '../../../components/ScreenComponent/Inbox/ModifyRequest/ModifyRequestBody';
import {appointmentModifyValidationSchema} from '../../../utils/config/ValidationSchema/validationSchema';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {useModReqInitialState} from './utils/useModReqInitalState';
import {useAppSelector} from '../../../store/store';
interface Props {
  route: any;
}
const ModifyAppointment = ({route}: Props) => {
  const {colors} = useTheme();
  const {proposal} = useAppSelector(state => state.proposal);
  const {loading, request} = useApi(methods._get);
  const {appointmentOpk} = route.params;
  const endpoint = `/appointment/update/FFsqPHww/proposal`;
  console.log('proposal', proposal);
  const handleSubmit = async (data: any) => {
    console.log('hello', appointmentOpk);
    const {
      petsId,
      proposalStartDate,
      proposalEndDate,
      dropOffStartTime,
      dropOffEndTime,
      pickUpStartTime,
      pickUpEndTime,
      serviceTypeId,
      specificModDates,
      recurringModDates,
      recurringSelectedDay,
      recurringStartDate,
      isRecurring,
      visitLength,
    } = data;
    const payload = {
      // proposedBy: 'USER',
      // petsId: petsId,
      // length: serviceTypeId === 3 || serviceTypeId === 5 ? visitLength : 30,
      // isRecurring: false,
      // dropOffStartTime:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : dropOffStartTime,
      // dropOffEndTime:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : dropOffEndTime,
      // pickUpStartTime:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : pickUpStartTime,
      // pickUpEndTime:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : pickUpEndTime,
      // proposalStartDate:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : proposalStartDate,
      // proposalEndDate:
      //   serviceTypeId === 3 || serviceTypeId === 5 ? '' : proposalEndDate,

      // appointmentserviceType:
      //   serviceTypeId === 3 ? 'VISIT' : serviceTypeId === 5 ? 'WALK' : 'NONE',
      // proposalOtherDate:
      //   serviceTypeId === 3 || serviceTypeId === 5 || serviceTypeId === 4
      //     ? isRecurring
      //       ? recurringModDates
      //       : specificModDates
      //     : [],
      // recurringStartDate:
      //   serviceTypeId === 1 || serviceTypeId === 2
      //     ? ''
      //     : isRecurring
      //     ? recurringStartDate
      //     : '',
      // recurringSelectedDay:
      //   serviceTypeId === 1 || serviceTypeId === 2
      //     ? []
      //     : isRecurring
      //     ? recurringSelectedDay
      //     : [],
      // additionalLengthPrice: 0,
      // regularPrice: 0,
      // additionalCharge: [],
      // providerExtraFee: 0,
      // totalPrice: 0,
      proposedBy: 'USER',
      appointmentserviceType: 'NONE',
      petsId: [1, 2],
      length: null,
      additionalLengthPrice: 0,
      regularPrice: 0,
      additionalCharge: [],
      providerExtraFee: 0,
      totalPrice: 0,
      dropOffStartTime: 'string',
      dropOffEndTime: 'string',
      pickUpStartTime: 'string',
      pickUpEndTime: 'string',
      proposalStartDate: 'string',
      proposalEndDate: 'string',
      proposalOtherDate: [],
      isRecurring: true,
      recurringStartDate: 'string',
      recurringSelectedDay: [],
    };
    const result = await request(endpoint, payload);
    console.log('res', payload, result);
  };

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
    paddingHorizontal: '5%',
    paddingTop: 20,
  },
});

export default ModifyAppointment;

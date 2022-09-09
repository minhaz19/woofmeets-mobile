import * as Yup from 'yup';

export const AvailabilityInitialValues = (id: number) => {
  return {
    providerServiceId: id,
    fri: false,
    mon: false,
    sat: false,
    sun: false,
    thu: false,
    tue: false,
    wed: false,
    fulltime: null,
    pottyBreak: '',
  };
};

export const availabilityValidation = Yup.object().shape({
  fri: Yup.boolean(),
  mon: Yup.boolean(),
  sat: Yup.boolean(),
  sun: Yup.boolean(),
  thu: Yup.boolean(),
  tue: Yup.boolean(),
  wed: Yup.boolean(),
  fulltime: Yup.boolean().oneOf([true]).required('Please Select at least one'),
  pottyBreak: Yup.string().required('pottyBreak must be selected'),
});

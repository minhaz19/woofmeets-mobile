import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  terms: Yup.boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

const setPasswordValidationSchema = Yup.object().shape({
  oldPass: Yup.string().required().min(8).label('Old Password'),
  newPass: Yup.string().required().min(8).label('New Password'),
  confirmPass: Yup.string().required().min(8).label('Confirm Password'),
});

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const forgotPasswordOtpValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).max(4).label('Opt'),
});
const verifyAccountValidationSchema = Yup.object().shape({
  code: Yup.string().required().min(4).max(4).label('Opt'),
});

export {
  loginValidationSchema,
  signUpValidationSchema,
  setPasswordValidationSchema,
  forgotPasswordValidationSchema,
  forgotPasswordOtpValidationSchema,
  verifyAccountValidationSchema,
};

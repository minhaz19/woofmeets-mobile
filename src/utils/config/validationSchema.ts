import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const setPasswordValidationSchema = Yup.object().shape({
  oldPass: Yup.string().required().min(8).label('Old Password'),
  newPass: Yup.string().required().min(8).label('New Password'),
  confirmPass: Yup.string().required().min(8).label('Confirm Password'),
});
export {
  loginValidationSchema,
  signUpValidationSchema,
  setPasswordValidationSchema,
};

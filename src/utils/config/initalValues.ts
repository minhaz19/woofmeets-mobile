import {
  forgotPasswordOtpType,
  forgotPasswordType,
  LoginType,
  SetPasswordType,
  SignUpType,
  verifyAccountType,
} from './types';

const loginValue: LoginType = {email: '', password: ''};
const signupValue: SignUpType = {email: '', password: '', terms: false};
const setPasswordValue: SetPasswordType = {
  oldPass: '',
  newPass: '',
  confirmPass: '',
};
const forgotPasswordValue: forgotPasswordType = {email: ''};
const forgotPasswordOtpValue: forgotPasswordOtpType = {code: ''};
const verifyAccountValue: verifyAccountType = {code: ''};

export {
  loginValue,
  signupValue,
  setPasswordValue,
  forgotPasswordValue,
  forgotPasswordOtpValue,
  verifyAccountValue,
};

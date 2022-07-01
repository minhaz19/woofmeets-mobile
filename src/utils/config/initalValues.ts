import {LoginType, SetPasswordType} from './types';

const loginValue: LoginType = {email: '', password: ''};
const signupValue: LoginType = {email: '', password: ''};
const setPasswordValue: SetPasswordType = {
  oldPass: 'a',
  newPass: 'c',
  confirmPass: 'c',
};

export {loginValue, signupValue, setPasswordValue};

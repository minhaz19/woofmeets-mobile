export interface LoginType {
  email: string;
  password: string;
}
export interface SignUpType {
  email: string;
  password: string;
  terms: boolean;
}
export interface SetPasswordType {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}
export interface forgotPasswordType {
  email: string;
}
export interface forgotPasswordOtpType {
  code: string;
}
export interface verifyAccountType {
  code: string;
}

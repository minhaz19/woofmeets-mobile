export const passwordReg =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const phoneNumberReg = /^(\+\d{1,2}[\s]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,5}$/;

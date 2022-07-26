import {Apple, Facebook, Google} from '../../../assets/SVG_LOGOS';

const signUpInitalState = {
  title: 'Sign Up',
  subTitle:
    'This password must be a alpha numeric value with at least 8 digit and one capital letter',
  image: require('../../../assets/image/login/logo.png'),
};

const othersAuthIcons = [
  {
    image: require('../../../assets/image/login/google.png'),
    icon: Google,
  },
  {
    image: require('../../../assets/image/login/facebook.png'),
    icon: Facebook,
  },
  {
    image: require('../../../assets/image/login/apple.png'),
    icon: Apple,
  },
];
export {signUpInitalState, othersAuthIcons};

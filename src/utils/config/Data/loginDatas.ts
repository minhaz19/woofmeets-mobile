import {Facebook, Google} from '../../../assets/svgs/SVG_LOGOS';

const loginInitalState = {
  title: 'Login',
  subTitle: 'Discover your social & try to login',
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
  // {
  //   image: require('../../../assets/image/login/apple.png'),
  //   icon: Apple,
  // },
];
export {loginInitalState, othersAuthIcons};

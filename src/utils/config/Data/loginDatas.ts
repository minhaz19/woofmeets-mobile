import { Platform } from 'react-native';
import {Apple, Facebook, Google} from '../../../assets/svgs/SVG_LOGOS';

const loginInitalState = {
  title: 'Login',
  subTitle: 'Discover your social & try to login',
  image: require('../../../assets/image/login/logo.png'),
};

const othersAuthIcons = [
  {
    icon: Google,
  },
  {
    icon: Facebook,
  },
  {
    icon: Platform.OS === 'ios' ? Apple : '',
  },
];
export {loginInitalState, othersAuthIcons};

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {registerBackgroundHandler} from './src/utils/helpers/NotificationServices';

// import FrameRate from 'react-native/Libraries/Animated/src/FrameRate';

registerBackgroundHandler();


AppRegistry.registerComponent(appName, () => App);

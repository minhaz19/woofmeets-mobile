/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {registerBackgroundHandler} from './src/utils/helpers/NotificationServices';

registerBackgroundHandler();

AppRegistry.registerComponent(appName, () => App);

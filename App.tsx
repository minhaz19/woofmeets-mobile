import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fst from 'react-native-vector-icons/Fontisto';
import Mci from 'react-native-vector-icons/MaterialCommunityIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import Ant from 'react-native-vector-icons/AntDesign';
import Ent from 'react-native-vector-icons/Entypo';
import MI from 'react-native-vector-icons/MaterialIcons';
import Fe from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Splash from './src/screens/splash';
import store from './src/store/store';
import ForceUpdates from './src/utils/helpers/ForceUpdates';
import {PERMISSIONS, request} from 'react-native-permissions';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {API_LOG_ROCKET, API_MSG} from '@env';
import {io} from 'socket.io-client';
// import {msgUrl} from './src/utils/helpers/httpRequest';
import LogRocket from '@logrocket/react-native';

Icon.loadFont();
Fst.loadFont();
Mci.loadFont();
Ion.loadFont();
Ent.loadFont();
MI.loadFont();
Ant.loadFont();
EvilIcons.loadFont();
Fe.loadFont();
Foundation.loadFont();
// FontAwesome5.loadFont();

export const socket = io(`${API_MSG}`);
const App = () => {
  ForceUpdates();

  useEffect(() => {
    LogRocket.init(API_LOG_ROCKET);

    if (Platform.OS === 'ios') {
      const callback = (status: AppStateStatus) => {
        if (status === 'active') {
          request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
            .then((result: any) => console.log(result))
            .catch((error: any) => console.log(error));
        }
      };
      callback(AppState.currentState); // initial call
      const listener = AppState.addEventListener('change', callback);
      return listener.remove;
    }
  }, []);
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
};

export default App;

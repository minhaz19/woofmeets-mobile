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
import {requestLocationPermission} from './src/utils/helpers/LocationPermission/requestLocationPermission';
import {io} from 'socket.io-client';
import {msgUrl} from './src/utils/helpers/httpRequest';
import {AppState, AppStateStatus} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

// import 'intl';
// import 'intl/locale-data/jsonp/en-US';
// import 'date-time-format-timezone';
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

export const socket = io(`${msgUrl}`);
const App = () => {
  ForceUpdates();
  requestLocationPermission();

  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
};

export default App;

import React from 'react';
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

const App = () => {
  return (
    <Provider store={store}>
      <Splash />
    </Provider>
  );
};

export default App;

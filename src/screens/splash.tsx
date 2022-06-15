import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Text_Size from '../constants/textScaling';
import MainNavigationContainer from '../navigation/MainNavigationContainer';

const Splash = () => {
  const [isPreviousUser] = useState(false);

  const [state, setState] = useState({
    showRealApp: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | any = null;
    if (state.showRealApp === false) {
      timer = setTimeout(() => {
        return setState({
          showRealApp: true,
        });
      }, 3000);
    } else {
      return () => clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [state.showRealApp]);

  const [ldIcon, setldIcon] = useState(true);

  useEffect(() => {
    let timer: any = null;
    if (ldIcon === true) {
      timer = setTimeout(() => {
        return setldIcon(false);
      }, 2000);
    } else {
      return () => clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [ldIcon]);

  const RenderIcon = () => {
    return (
      <View style={styles.logoContainer}>
        <Text>Logo</Text>
      </View>
    );
  };

  if (ldIcon) {
    return <RenderIcon />;
  } else {
    return (
      <>
        {isPreviousUser ? (
          <View>
            <Text style={styles.text}>Welcome</Text>
          </View>
        ) : state.showRealApp ? (
          <MainNavigationContainer />
        ) : (
          <View>
            <Text style={styles.text}>Hello</Text>
          </View>
        )}
      </>
    );
  }
};

export default Splash;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: Text_Size.Text_1,
    fontFamily: 'Arial',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontSize: Text_Size.Text_4,
    fontFamily: 'Arial',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
  },
});

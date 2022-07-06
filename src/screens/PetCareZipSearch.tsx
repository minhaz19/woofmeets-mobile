import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyles from '../../GlobalStyles';
import {ZipSearch} from '../assets/SVG_LOGOS';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import ButtonCom from '../components/UI/ButtonCom';
import {btnStyles} from '../constants/theme/common/buttonStyles';
import {colors} from '../constants/theme/textTheme';

const PetCareZipSearch = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const [postCode, setPostCode] = useState();
  return (
    <View style={GlobalStyles.droidSafeArea}>
      <SafeAreaView>
        <TouchableOpacity style={styles.cancelContainer}>
          <Text style={[styles.textHeader, {color: colors.headerText}]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View>
            <ZipSearch width={SCREEN_WIDTH / 1.6} />
          </View>
        </View>
        <View style={{paddingHorizontal: '10%'}}>
          <Text style={[styles.textHeader, {color: colors.headerText}]}>
            Where are you looking for pet care?
          </Text>
          <View style={styles.zipContainer}>
            <Text style={[styles.zipText, {color: colors.headerText}]}>
              Zip code
            </Text>
            <TextInput
              placeholder="Enter zip code"
              value={postCode}
              onChangeText={pCode => setPostCode(pCode)}
              placeholderTextColor="rgba(66, 66, 68, 0.47)"
              style={styles._input}
            />
          </View>
          <ButtonCom
            title={'Continue'}
            textAlignment={btnStyles.textAlignment}
            containerStyle={btnStyles.containerStyleFullWidth}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => props.navigation.navigate('BottomTabNavigator')}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  _input: {
    width: '100%',
    fontSize: Text_Size.Text_1,
    color: Colors.headerText,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  cancelContainer: {
    alignSelf: 'flex-end',
    paddingRight: '5%',
    paddingTop: '3%',
    paddingBottom: '10%',
  },
  textHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
  },
  zipText: {
    fontSize: Text_Size.Text_0,
    fontWeight: '500',
  },
  zipContainer: {
    paddingTop: '5%',
  },
});

export default PetCareZipSearch;

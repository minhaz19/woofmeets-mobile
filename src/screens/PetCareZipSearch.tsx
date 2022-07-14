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
import {useTheme} from '../constants/theme/hooks/useTheme';
import BottomButton from '../components/ScreenComponent/SelectService/BottomButton';

const PetCareZipSearch = (props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) => {
  const [postCode, setPostCode] = useState<string>();
  const {colors} = useTheme();
  return (
    <View style={GlobalStyles.droidSafeArea}>
      <SafeAreaView
        style={[
          styles.rootContainer,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.cancelContainer,
            {backgroundColor: colors.backgroundColor},
          ]}
          onPress={() => props.navigation.goBack()}>
          <Text style={[styles.textHeader, {color: colors.headerText}]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View>
            <ZipSearch width={SCREEN_WIDTH / 1.4} />
          </View>
        </View>
        <View style={styles.boxContainer}>
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
              style={[styles._input, {color: colors.headerText}]}
            />
          </View>
        </View>
        <BottomButton
          title="Continue"
          onSelect={() => props.navigation.navigate('ServiceMain')}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
    paddingTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '8%' : '10%',
  },
  boxContainer: {paddingHorizontal: '10%'},
  _input: {
    width: '100%',
    height: '31%',
    fontSize: Text_Size.Text_1,
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

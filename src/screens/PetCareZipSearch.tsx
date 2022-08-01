import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {ZipSearch} from '../assets/SVG_LOGOS';
import {SCREEN_WIDTH} from '../constants/WindowSize';
import Colors from '../constants/Colors';
import Text_Size from '../constants/textScaling';
import {useTheme} from '../constants/theme/hooks/useTheme';
import BottomButton from '../components/ScreenComponent/Service/BottomButton';
import BottomSpacingNav from '../components/UI/BottomSpacingNav';
import TitleText from '../components/common/text/TitleText';
import DescriptionText from '../components/common/text/DescriptionText';

const PetCareZipSearch = (props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) => {
  const [postCode, setPostCode] = useState<string>();
  const {colors} = useTheme();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.rootContainer,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <ScrollView>
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
            <TitleText text="Cancel" textStyle={styles.textHeader} />
          </TouchableOpacity>
          <View style={styles.container}>
            <View>
              <ZipSearch
                width={
                  SCREEN_WIDTH <= 380 ? SCREEN_WIDTH / 1.8 : SCREEN_WIDTH / 1.4
                }
              />
            </View>
          </View>
          <View style={styles.boxContainer}>
            <TitleText
              text="Where are you looking for pet care?"
              textStyle={styles.textHeader}
            />
            <View style={styles.zipContainer}>
              <DescriptionText text="Zip code" textStyle={styles.zipText} />
              <TextInput
                placeholder="Enter zip code"
                value={postCode}
                onChangeText={pCode => setPostCode(pCode)}
                style={[styles._input, {color: colors.headerText}]}
              />
            </View>
          </View>
        </SafeAreaView>
        <BottomSpacingNav />
      </ScrollView>
      <BottomButton
        title="Next"
        onSelect={() => props.navigation.navigate('ServiceMain')}
        widthStyle={styles.boxContainer}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: '5%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '0%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
    paddingTop: SCREEN_WIDTH <= 380 ? '0%' : SCREEN_WIDTH <= 600 ? '8%' : '10%',
  },
  boxContainer: {paddingHorizontal: '10%'},
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
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
    paddingBottom: 10,
  },
  zipContainer: {
    paddingTop: '5%',
  },
});

export default PetCareZipSearch;

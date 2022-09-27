import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import TitleText from '../../components/common/text/TitleText';
import ButtonCom from '../../components/UI/ButtonCom';
import { btnStyles } from '../../constants/theme/common/buttonStyles';
import { BriefCaseSvg, HomeSvgICon, LocationSvg, PetFootSvg, WeatherSvg } from '../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../components/common/text/DescriptionText';
import { SCREEN_WIDTH } from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import ScreenRapper from '../../components/common/ScreenRapper';
import ErrorMessage from '../../components/common/Form/ErrorMessage';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSpacing from '../../components/UI/BottomSpacing';
import ServiceCard from '../../components/ScreenComponent/search/ServiceCard';

interface Props {
  item: any;
}

const PetCareZipSearch = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [postCode, setPostCode] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const petData = [
    {
      id: 6,
      sequence: 6,
      name: 'Dog',
    },
    {
      id: 7,
      sequence: 7,
      name: 'Cat',
    },
  ];
  const selectData = [
    {
      id: 1,
      sequence: 1,
      name: 'Boarding',
      image: <BriefCaseSvg />,
      description: "in the sitter's home",
    },
    {
      id: 2,
      sequence: 2,
      name: 'Dog Waking',
      _image: <PetFootSvg fill={'#FFA557'} />,
      get image() {
        return this._image;
      },
      set image(value) {
        this._image = value;
      },
      description: 'in your neighborhood',
    },
    {
      id: 3,
      sequence: 3,
      name: 'Doggy Day Care',
      image: <WeatherSvg />,
      description: "in the sitter's home",
    },
    {
      id: 4,
      sequence: 4,
      name: 'Drop-in Visits',
      image: <LocationSvg />,
      description: 'visits in your home',
    },
    {
      id: 5,
      sequence: 5,
      name: 'House Sitting',
      image: <HomeSvgICon />,
      description: 'in your home',
    },
  ];
  const {colors} = useTheme();
  const handleSubmit = () => {
    props.navigation.navigate('AllProvider')
  }
  const [sequence, setSequence] = useState<number>(0);
  const [petSequence, setPetSequence] = useState<number>(0);

  const onPressService = (id: number) => {
    setSequence(id);
  };
  const onPressPet = (id: number) => {
    setPetSequence(id);
  };

  const handleZipCode = (code: number) => {
    console.log(postCode)
    let reg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    setPostCode(code);
    if (reg.test(code) === false) {
      setErrorMessage('Zip code is not valid');
    } else {
      setErrorMessage(null);
    }
  }
  

  const RenderHeader = () => {
    return (
      <View>
        <TitleText
          text="Looking service for my"
          textStyle={styles.textHeader}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {petData.map(item => (
          <ServiceCard
              data={item}
              noShadow
              onPressEvent={onPressPet}
              sequence={petSequence}
              divide={2}
          />
        ))}
        </View>
        <TitleText
          text="I want"
          textStyle={styles.textHeader}
        />
      </View>
    )
  }

  return (
    <ScreenRapper>
      <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
      <KeyboardAvoidingView
        keyboardVerticalOffset={20}
      //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rootContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.boxContainer}>
            <RenderHeader />
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {selectData.map(item => (
              <ServiceCard
                  data={item}
                  noShadow
                  onPressEvent={onPressService}
                  sequence={sequence}
              />
            ))}
            </View>
            <View style={styles.zipContainer}>
              <DescriptionText text="Near" textStyle={styles.zipText} />
              <TextInput
                  placeholder="Enter zip code"
                  keyboardType="number-pad"
                  value={postCode}
                  allowFontScaling={false}
                  onChangeText={(code) => handleZipCode(code)}
                  style={[styles._input, {color: colors.headerText}]}
              />
              {errorMessage && (
                  <ErrorMessage error={errorMessage} />
                  )}
              <View style={styles.footerContainer}>
                  <ButtonCom
                  title="Search"
                  // loading={loading}
                  textAlignment={btnStyles.textAlignment}
                  containerStyle={btnStyles.containerStyleFullWidth}
                  titleStyle={btnStyles.titleStyle}
                  onSelect={handleSubmit}
                  />
              </View>
            </View>
          </View>
          
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <BottomSpacing />
      </ScrollView>
    </ScreenRapper>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  scrollContainer: {
    // paddingHorizontal: '5%',
  },
  boxContainer: {
    // paddingHorizontal: '10%'
  },
  textHeader: {
    fontSize: Text_Size.Text_1,
    fontWeight: '500',
    paddingLeft: '3%',
    paddingBottom: 8,
  },
  footerContainer: {
    paddingHorizontal: '10%',
    paddingTop: 20,
    paddingBottom: 40
  },
  flatList: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  _input: {
    width: '100%',
    height: SCREEN_WIDTH <= 380 ? 35 : SCREEN_WIDTH <= 480 ? 40 : 50,
    fontSize: Text_Size.Text_11,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 8,
    marginVertical: 6,
  },
  zipText: {
    fontSize: Text_Size.Text_0,
    fontWeight: '500',
    paddingBottom: 10,
  },
  zipContainer: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
    paddingLeft: '3%',
  },

});
 
export default PetCareZipSearch;

import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import React, {FC, useState} from 'react';
import Text_Size from '../../constants/textScaling';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import BottomSpacingNav from '../../components/UI/BottomSpacingNav';
import TitleText from '../../components/common/text/TitleText';
import ButtonCom from '../../components/UI/ButtonCom';
import { btnStyles } from '../../constants/theme/common/buttonStyles';
import { BriefCaseSvg, HomeSvgICon, LocationSvg, PetFootSvg, WeatherSvg } from '../../assets/svgs/SVG_LOGOS';
import ServiceCard from '../../components/ScreenComponent/search/ServiceCard';
import DescriptionText from '../../components/common/text/DescriptionText';
import { SCREEN_WIDTH } from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import ScreenRapper from '../../components/common/ScreenRapper';

interface Props {
  item: any;
}

const PetCareZipSearch = (props: {
  navigation: {goBack: () => void; navigate: (arg0: string) => void};
}) => {
  const [postCode, setPostCode] = useState<string>();
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

  const renderHeader = () => {
    return (
      <View>
        <TitleText
          text="Looking service for my"
          textStyle={styles.textHeader}
        />
        <FlatList
          columnWrapperStyle={styles.flatList}
          data={petData}
          numColumns={2}
          renderItem={({item}) => (
            <ServiceCard
              data={item}
              noShadow
              onPressEvent={onPressPet}
              sequence={petSequence}
              divide={2}
            />
          )}
          keyExtractor={item => item.id}
        />
        <TitleText
          text="I want"
          textStyle={styles.textHeader}
        />
      </View>
    )
  }

  const RenderItem: FC<Props> = ({item}) => (
    <ServiceCard
      data={item}
      noShadow
      onPressEvent={onPressService}
      sequence={sequence}
    />
  );

  const renderFooter = () => {
    return (
      <View>
        <View style={styles.zipContainer}>
            <DescriptionText text="Near" textStyle={styles.zipText} />
            <TextInput
              placeholder="Enter zip code"
              value={postCode}
              onChangeText={pCode => setPostCode(pCode)}
              style={[styles._input, {color: colors.headerText}]}
            />
          </View>
      </View>
    )
  }

  return (
    <ScreenRapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rootContainer}>
          <View style={styles.boxContainer}>
            <FlatList
              // refreshing={refreshing}
              // onRefresh={onRefresh}
              columnWrapperStyle={styles.flatList}
              data={selectData}
              numColumns={3}
              renderItem={RenderItem}
              keyExtractor={item => item.id}
              ListFooterComponent={renderFooter}
              ListHeaderComponent={renderHeader}
            />
          </View>
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
        <BottomSpacingNav />
      </KeyboardAvoidingView>
    </ScreenRapper>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingLeft: 5,
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
    fontSize: Text_Size.Text_10,
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

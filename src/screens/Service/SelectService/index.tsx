import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import Screen from '../../../components/common/Screen';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ReusableSelectService from '../../../components/ScreenComponent/Service/ReusableSelectService';
import Text_Size from '../../../constants/textScaling';
import {
  BriefCaseSvg,
  LocationSvg,
  HomeSvgICon,
  WeatherSvg,
  PetFootSvg,
} from '../../../assets/SVG_LOGOS';

const selectData = [
  {
    id: 1,
    name: 'Boarding',
    image: <BriefCaseSvg />,
    description: "in the sitter's home",
  },
  {
    id: 2,
    name: 'Dog Waking',
    image: <PetFootSvg fill={'#FFA557'} />,
    description: 'in your neighborhood',
  },
  {
    id: 3,
    name: 'Doggy Day Care',
    image: <WeatherSvg />,
    description: "in the sitter's home",
  },
  {
    id: 4,
    name: 'Drop-in Visits',
    image: <LocationSvg />,
    description: 'visits in your home',
  },
  {
    id: 5,
    name: 'House Sitting',
    image: <HomeSvgICon />,
    description: 'in your home',
  },
];

interface Props {
  item: any;
}

const SelectService = () => {
  const {colors} = useTheme();
  const renderItem: FC<Props> = ({item}) => (
    <ReusableSelectService data={item} />
  );
  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={[styles.textDesign, {color: colors.headerText}]}>
            Select a Service
          </Text>
          <FlatList
            data={selectData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default SelectService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
  },
  textDesign: {
    fontSize: Text_Size.Text_2,
    fontWeight: '500',
    marginBottom: 10,
  },
});

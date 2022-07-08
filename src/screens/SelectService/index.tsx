import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import React, {FC} from 'react';
import Screen from '../../components/common/Screen';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import ReusableSelectService from '../../components/ScreenComponent/SelectService/ReusableSelectService';
import Colors from '../../constants/Colors';

const selectData = [
  {
    id: 1,
    name: 'Boarding',
    image: require('../../assets/image/selectServiceImage/database.png'),
    description: "in the sitter's home",
  },
  {
    id: 2,
    name: 'Dog Waking',
    image: require('../../assets//image/selectServiceImage/foot.png'),
    description: 'in your neighborhood',
  },
  {
    id: 3,
    name: 'Doggy Day Care',
    image: require('../../assets//image/selectServiceImage/light.png'),
    description: "in the sitter's home",
  },
  {
    id: 4,
    name: 'Drop-in Visits',
    image: require('../../assets//image/selectServiceImage/dip-in.png'),
    description: 'visits in your home',
  },
  {
    id: 5,
    name: 'House Sitting',
    image: require('../../assets//image/selectServiceImage/home_1.png'),
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
          <Text style={styles.textDesign}>Select a Service</Text>
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
  },
  textDesign: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.headerText,
    marginBottom: 10,
  },
});

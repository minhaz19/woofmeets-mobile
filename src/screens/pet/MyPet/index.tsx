/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import {FlatList, StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import MyPetHome from '../../../components/ScreenComponent/Pet/MyPet/MyPetHome';
import Screen from '../../../components/common/Screen';
import MyPetList from '../../../components/ScreenComponent/Pet/MyPet/MyPetList';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import BottomSpacing from '../../../components/UI/BottomSpacing';
interface Props {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

const MyPet = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const onPress = () => {
    navigation.navigate('AddPet');
  };
  const {colors} = useTheme();
  return (
    <Screen
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? colors.backgroundColor : 'transparent'},
      ]}>
      <View>
        <FlatList
          data={[{}, {}, {}, {}, {}, {type: 'pet'}]}
          columnWrapperStyle={styles.columnWrapper}
          keyExtractor={(_, i) => i.toString()}
          numColumns={SCREEN_WIDTH >= 800 ? 3 : 2}
          ListEmptyComponent={<MyPetHome />}
          renderItem={({item}) => (
            <View>
              {item['type'] === 'pet' ? (
                <MyPetList onPress={onPress} />
              ) : (
                <MyPetList dataList={[{id: '1'}]} />
              )}
            </View>
          )}
          ListFooterComponent={<BottomSpacing />}
        />
      </View>
    </Screen>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH >= 800 ? 15 : 0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 14,
  },
});

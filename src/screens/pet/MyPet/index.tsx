/* eslint-disable dot-notation */
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import MyPetHome from '../../../components/ScreenComponent/Pet/MyPet/MyPetHome';
import Screen from '../../../components/common/Screen';
import MyPetList from '../../../components/ScreenComponent/Pet/MyPet/MyPetList';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
interface Props {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

const MyPet = ({navigation}: Props) => {
  const onPress = () => {
    navigation.navigate('AddPet');
  };
  const {colors} = useTheme();
  return (
    <Screen
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View>
        <FlatList
          data={[{id: 2}, {id: 1}, {id: 3}, {id: 4}, {id: 5}, {id: 6}]}
          columnWrapperStyle={styles.columnWrapper}
          keyExtractor={(_, i) => i.toString()}
          numColumns={2}
          ListEmptyComponent={<MyPetHome />}
          renderItem={({item}) => (
            <View>
              {item['add'] === 'pet' ? (
                <MyPetList onPress={onPress} />
              ) : (
                <MyPetList dataList={[{id: '1'}]} />
              )}
            </View>
          )}
        />
      </View>
    </Screen>
  );
};

export default MyPet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 14,
    marginVertical: 8,
  },
});

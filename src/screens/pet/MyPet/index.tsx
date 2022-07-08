/* eslint-disable dot-notation */
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import MyPetHome from '../../../components/ScreenComponent/Pet/MyPet/MyPetHome';
import Screen from '../../../components/common/Screen';
import MyPetList from '../../../components/ScreenComponent/Pet/MyPet/MyPetList';
interface Props {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

const MyPet = ({navigation}: Props) => {
  const onPress = () => {
    navigation.navigate('AddPet');
  };
  return (
    <Screen style={styles.container}>
      <View>
        <FlatList
          data={[]}
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
    backgroundColor: 'white',
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

/* eslint-disable dot-notation */
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import MyPetHome from '../../../components/ScreenComponent/Pet/MyPet/MyPetHome';
import Screen from '../../../components/common/Screen';
import MyPetList from '../../../components/ScreenComponent/Pet/MyPet/MyPetList';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import {useMyPetUtils} from './utils/useMyPetUtils';

interface Props {
  navigation: {
    navigate: (arg0: string, arg1: {opk: string | null}) => void;
  };
  onBoarding?: boolean;
}

const MyPet = ({navigation, onBoarding}: Props) => {
  const {colors} = useTheme();
  const {loading, singlePetLoading, onPress, petList} = useMyPetUtils(
    navigation,
    onBoarding,
  );
  return (
    <>
      {(loading || singlePetLoading) && <AppActivityIndicator visible={true} />}
      <Screen
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
        <View>
          <FlatList
            data={petList}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            numColumns={SCREEN_WIDTH >= 800 ? 3 : 2}
            ListEmptyComponent={<MyPetHome onPress={() => onPress(0)} />}
            renderItem={({item}) => (
              <View>
                {item['type'] === 'pet' ? (
                  <MyPetList onPress={() => onPress(0)} />
                ) : (
                  <MyPetList
                    dataList={[{id: '1'}]}
                    name={item?.name}
                    ageMonth={item?.ageMonth}
                    ageYear={item?.ageYear}
                    weight={item?.weight}
                    type={item.type}
                    gender={item.gender}
                    profile_image={item.profile_image?.url}
                    onPress={() => onPress(1, item.opk)}
                  />
                )}
              </View>
            )}
            ListFooterComponent={<BottomSpacing />}
          />
        </View>
      </Screen>
    </>
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

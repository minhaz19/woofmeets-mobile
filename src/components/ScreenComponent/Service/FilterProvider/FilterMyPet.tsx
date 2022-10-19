import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../common/text/TitleText';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {setSelectedPet} from '../../../../store/slices/Provider/ProviderFilter/ProviderFilterSlice';
import {useAppDispatch} from '../../../../store/store';

interface Props {
  selectedPet?: any;
}

const FilterMyPet = ({selectedPet}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const handleMultipleCheck = (id: number) => {
    const myNewPet = selectedPet.map((item: any) => {
      if (item.id === id) {
        return {...item, selected: !item.selected};
      } else {
        return item;
      }
    });
    console.log(myNewPet);
    dispatch(setSelectedPet(myNewPet));
  };
  return (
    <View style={[styles.boxContainer]}>
      <FlatList
        data={selectedPet}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item}) => {
          return (
            <AppTouchableOpacity
              key={item.id}
              onPress={() => {
                handleMultipleCheck(item.id);
              }}
              style={[
                styles.pet,
                {
                  borderColor: item.selected ? Colors.primary : Colors.border,
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              {item.name && (
                <TitleText text={item.name} textStyle={styles.text} />
              )}
            </AppTouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FilterMyPet;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  pet: {
    height: 'auto',
    width: SCREEN_WIDTH / 3 - 30,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    marginRight: 7,
    marginVertical: 7,
  },
  boxContainer: {},
});

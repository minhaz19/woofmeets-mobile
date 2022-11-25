import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import HeaderText from '../../../components/common/text/HeaderText';
import Colors from '../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Text_Size from '../../../constants/textScaling';
import {useAppDispatch} from '../../../store/store';
import {
  setIsFoodSelected,
  setIsPeeSelected,
  setIsPooSelected,
  setIsWaterSelected,
} from '../../../store/slices/reportCard/reportCardSlice';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
interface Props {
  id: number;
  isPeeSelected: any;
  isPooSelected: any;
  isFoodSelected: any;
  isWaterSelected: any;
}

const ReportCount = ({
  id,
  isPeeSelected,
  isPooSelected,
  isFoodSelected,
  isWaterSelected,
}: Props) => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  // handle pee, poo, food and water
  const handlePee = (petId: number, countSing: string) => {
    const myNewPet = isPeeSelected?.map((item: any) => {
      if (item.id === petId) {
        if (countSing === 'plus') {
          return {...item, pee: item?.pee ? item.pee + 1 : 1};
        } else if (countSing === 'minus') {
          if (item?.pee <= 0) {
            return {...item, pee: 0};
          } else {
            return {...item, pee: item?.pee - 1};
          }
        }
      } else {
        return item;
      }
    });
    dispatch(setIsPeeSelected(myNewPet));
  };

  // handlePoo
  const handlePoo = (petId: number, countSing: string) => {
    const myNewPet = isPooSelected?.map((item: any) => {
      if (item.id === petId) {
        if (countSing === 'plus') {
          return {...item, poo: item?.poo ? item.poo + 1 : 1};
        } else if (countSing === 'minus') {
          if (item?.poo <= 0) {
            return {...item, poo: 0};
          } else {
            return {...item, poo: item?.poo - 1};
          }
        }
      } else {
        return item;
      }
    });
    dispatch(setIsPooSelected(myNewPet));
  };

  // handle Food
  const handleFood = (petId: number, countSing: string) => {
    const myNewPet = isFoodSelected?.map((item: any) => {
      if (item.id === petId) {
        if (countSing === 'plus') {
          return {...item, food: item?.food ? item?.food + 1 : 1};
        } else if (countSing === 'minus') {
          if (item?.food <= 0) {
            return {...item, food: 0};
          } else {
            return {...item, food: item?.food - 1};
          }
        }
      } else {
        return item;
      }
    });
    dispatch(setIsFoodSelected(myNewPet));
  };

  // handle Water
  const handleWater = (petId: number, countSing: string) => {
    const myNewPet = isWaterSelected?.map((item: any) => {
      if (item.id === petId) {
        if (countSing === 'plus') {
          return {...item, water: item?.water ? item.water + 1 : 1};
        } else if (countSing === 'minus') {
          if (item?.water <= 0) {
            return {...item, water: 0};
          } else {
            return {...item, water: item?.water - 1};
          }
        }
      } else {
        return item;
      }
    });
    dispatch(setIsWaterSelected(myNewPet));
  };
  return (
    <View>
      {isPeeSelected && isPeeSelected?.map((item: any) => {
        return (
          item?.id === id && (
            <View key={item?.id}>
              <View style={styles.container}>
                <HeaderText text={'Pee'} />
                <View style={styles.countContainer}>
                  <Pressable onPress={() => handlePee(id, 'minus')}>
                    <FontAwesome
                      name="minus"
                      size={20}
                      color={Colors.primary}
                      style={styles.iconStyles}
                    />
                  </Pressable>
                  <HeaderText
                    text={item?.pee ? item?.pee : 0}
                    textStyle={styles.header}
                  />
                  <Pressable onPress={() => handlePee(id, 'plus')}>
                    <FontAwesome
                      name="plus"
                      size={20}
                      color={Colors.primary}
                      style={styles.iconStyles}
                    />
                  </Pressable>
                </View>
              </View>
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
              />
            </View>
          )
        );
      })}
      {isPooSelected &&
        isPooSelected?.map((item: any) => {
          return (
            item?.id === id && (
              <View key={item?.id}>
                <View style={styles.container}>
                  <HeaderText text={'Poo'} />
                  <View style={styles.countContainer}>
                    <Pressable onPress={() => handlePoo(id, 'minus')}>
                      <FontAwesome
                        name="minus"
                        size={20}
                        color={Colors.primary}
                        style={styles.iconStyles}
                      />
                    </Pressable>
                    <HeaderText
                      text={item?.poo ? item?.poo : 0}
                      textStyle={styles.header}
                    />
                    <Pressable onPress={() => handlePoo(id, 'plus')}>
                      <FontAwesome
                        name="plus"
                        size={20}
                        color={Colors.primary}
                        style={styles.iconStyles}
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={[
                    styles.divider,
                    {backgroundColor: colors.descriptionText},
                  ]}
                />
              </View>
            )
          );
        })}
      {isFoodSelected &&
        isFoodSelected?.map((item: any) => {
          return (
            item?.id === id && (
              <View key={item?.id}>
                <View style={styles.container}>
                  <HeaderText text={'Food'} />
                  <View style={styles.countContainer}>
                    <Pressable onPress={() => handleFood(id, 'minus')}>
                      <FontAwesome
                        name="minus"
                        size={20}
                        color={Colors.primary}
                        style={styles.iconStyles}
                      />
                    </Pressable>
                    <HeaderText
                      text={item?.food ? item?.food : 0}
                      textStyle={styles.header}
                    />
                    <Pressable onPress={() => handleFood(id, 'plus')}>
                      <FontAwesome
                        name="plus"
                        size={20}
                        color={Colors.primary}
                        style={styles.iconStyles}
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={[
                    styles.divider,
                    {backgroundColor: colors.descriptionText},
                  ]}
                />
              </View>
            )
          );
        })}
      {isWaterSelected &&
        isWaterSelected?.map((item: any) => {
          return (
            item.id === id && (
              <View key={item?.id} style={styles.container}>
                <HeaderText text={'Water'} />
                <View style={styles.countContainer}>
                  <Pressable onPress={() => handleWater(id, 'minus')}>
                    <FontAwesome
                      name="minus"
                      size={20}
                      color={Colors.primary}
                      style={styles.iconStyles}
                    />
                  </Pressable>
                  <HeaderText
                    text={item?.water ? item?.water : 0}
                    textStyle={styles.header}
                  />
                  <Pressable onPress={() => handleWater(id, 'plus')}>
                    <FontAwesome
                      name="plus"
                      size={20}
                      color={Colors.primary}
                      style={styles.iconStyles}
                    />
                  </Pressable>
                </View>
              </View>
            )
          );
        })}
    </View>
  );
};

export default ReportCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  header: {
    textAlign: 'center',
    fontSize: Text_Size.Text_2,
    marginHorizontal: 10,
  },
  iconStyles: {textAlign: 'center', marginHorizontal: 4},
  divider: {
    height: 1,
    opacity: 0.3,
    marginVertical: '2%',
  },
});

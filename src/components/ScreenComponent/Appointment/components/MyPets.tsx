import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../common/text/TitleText';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {Plus} from '../../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../common/text/DescriptionText';

const pets = [
  {
    id: 1,
    name: 'Golu',
    active: true,
  },
  {
    id: 2,
    name: 'Molu',
    active: true,
  },
  {
    id: 3,
    name: 'Tolu',
    active: true,
  },
  {
    id: 4,
    name: 'Cholu',
    active: true,
  },

  {
    id: 5,
    Icon: Plus,
    text: '',
    new: true,
  },
];
const MyPets = () => {
  const [newData, setDatas] = useState(pets);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.id === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  return (
    <>
      {newData.length === 0 ? (
        <View>
          <TitleText textStyle={styles.headerText} text={'Your Pets'} />
          <DescriptionText
            textStyle={styles.descriptionText}
            text="You havent listed any pets yet, Please add!"
          />
          <AppTouchableOpacity onPress={() => {}} style={[styles.newPet]}>
            <Plus fill="black" width={20} height={20} />
          </AppTouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TitleText textStyle={styles.headerText} text={'Your Pets'} />
            {/* <View style={styles.iconWrapper}>
              <Pets width={25} height={25} fill="black" />
            </View> */}
          </View>
          <View style={styles.container}>
            {newData.map((item, index) =>
              item.new ? (
                <AppTouchableOpacity
                  key={index}
                  onPress={() => {}}
                  style={[styles.icon]}>
                  <item.Icon fill="black" width={20} height={20} />
                </AppTouchableOpacity>
              ) : (
                <AppTouchableOpacity
                  key={index}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                  }}
                  style={[
                    styles.pet,
                    {borderColor: item.active ? Colors.primary : Colors.border},
                  ]}>
                  {item.name && (
                    <TitleText text={item.name} textStyle={styles.text} />
                  )}
                </AppTouchableOpacity>
              ),
            )}
          </View>
        </>
      )}
    </>
  );
};

export default MyPets;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  descriptionText: {
    marginBottom: 10,
  },
  iconWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: Colors.border,
    borderRadius: 6,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 0,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginTop: 10,
  },
  pet: {
    height: 'auto',
    width: SCREEN_WIDTH / 3 - 30,
    borderWidth: 1,

    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 7,
    marginVertical: 7,
  },
  icon: {
    height: 'auto',
    width: SCREEN_WIDTH / 3 - 30,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'white',
    borderRadius: 4,
    marginHorizontal: 7,
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPet: {
    flex: 0,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.border,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

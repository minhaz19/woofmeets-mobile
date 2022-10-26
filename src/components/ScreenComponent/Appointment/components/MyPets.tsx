/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../common/text/TitleText';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {Plus} from '../../../../assets/svgs/SVG_LOGOS';
import DescriptionText from '../../../common/text/DescriptionText';
import {useAppSelector} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {useFormContext} from 'react-hook-form';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
let petsId: any = [];
interface Props {
  appointmentType: string;
}
const MyPets = ({appointmentType}: Props) => {
  const {pets: allPets} = useAppSelector(state => state.allPets);
  const [newData, setDatas] = useState<any>([]);
  const handleMultipleCheck = (id: number) => {
    const newArray = [...newData];
    const index = newArray.findIndex(item => item.petId === id);
    newArray[index].active = !newArray[index].active;
    setDatas(newArray);
  };
  const user = useAppSelector(state => state.whoAmI);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const petsInfo = proposedServiceInfo?.petsInfo;
  const providerId = proposedServiceInfo?.providerId;
  const {setValue, watch} = useFormContext();
  const {petsId: pp} = watch();
  useEffect(() => {
    if (
      providerId === user?.user?.provider?.id &&
      appointmentType !== 'create'
    ) {
      const modArray = petsInfo?.map((item: any, index: number) => ({
        id: index + 1,
        name: item.pet.name,
        petId: item.petId,
        active:
          pp.findIndex((it: number) => it === item.petId) !== -1 ? true : false,
      }));
      setDatas(modArray);
      petsId = [...pp];
    } else {
      const modArray = allPets?.map((item: any, index: number) => {
        return {
          id: index + 1,
          name: item.name,
          petId: item.id,
          active:
            pp.findIndex((it: number) => it === item.id) !== -1 ? true : false,
        };
      });
      modArray?.push({
        id: allPets.length,
        Icon: Plus,
        text: '',
        new: true,
      });
      modArray && setDatas(modArray);
    }
  }, [allPets, providerId, user, petsInfo]);
  const navigation = useNavigation<any>();
  const {isDarkMode, colors} = useTheme();
  console.log('my', allPets);
  return (
    <>
      {appointmentType !== 'create' &&
      proposedServiceInfo?.providerId === user?.user?.provider?.id ? (
        <>
          <View style={styles.headerContainer}>
            <TitleText textStyle={styles.headerText} text={'Client Pets'} />
          </View>
          <View style={[styles.container]}>
            {newData?.map((item: any, index: number) => (
              <AppTouchableOpacity
                key={index}
                onPress={() => {
                  handleMultipleCheck(item.petId);
                  const matchIndex = petsId.indexOf(item.petId);
                  if (matchIndex === -1) {
                    petsId.push(item.petId);
                  } else {
                    petsId.splice(matchIndex, 1);
                  }
                  setValue('petsId', petsId);
                }}
                style={[
                  styles.pet,
                  {
                    borderColor: item.active
                      ? Colors.primary
                      : colors.borderColor,
                    backgroundColor: item.active
                      ? Colors.primary
                      : isDarkMode
                      ? Colors.lightDark
                      : Colors.background,
                  },
                ]}>
                {item.name && (
                  <TitleText
                    text={item.name}
                    textStyle={{
                      textAlign: 'center',
                      paddingVertical: 10,
                      fontWeight: 'bold',
                      color: item.active
                        ? Colors.background
                        : colors.headerText,
                    }}
                  />
                )}
              </AppTouchableOpacity>
            ))}
          </View>
        </>
      ) : allPets === null || allPets === undefined ? (
        <View>
          <TitleText textStyle={styles.headerText} text={'Your Pets'} />
          <DescriptionText
            textStyle={styles.descriptionText}
            text="You havent listed any pets yet, Please add!"
          />
          <AppTouchableOpacity
            onPress={() =>
              navigation.navigate('AddPetHome', {opk: 'Appointment'})
            }
            style={[styles.newPet]}>
            <Plus fill={colors.headerText} width={20} height={20} />
          </AppTouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TitleText textStyle={styles.headerText} text={'Your Pets'} />
          </View>
          <View style={[styles.container]}>
            {newData?.map((item: any, index: number) =>
              item.new ? (
                <AppTouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('AddPetHome', {opk: 'Appointment'})
                  }
                  style={[
                    styles.icon,
                    {
                      backgroundColor: isDarkMode
                        ? Colors.lightDark
                        : colors.borderColor,
                      borderColor: colors.borderColor,
                      padding: 6,
                    },
                  ]}>
                  <item.Icon
                    fill={colors.descriptionText}
                    width={20}
                    height={20}
                  />
                </AppTouchableOpacity>
              ) : (
                <AppTouchableOpacity
                  key={index}
                  onPress={() => {
                    handleMultipleCheck(item.petId);
                    const matchIndex = petsId.indexOf(item.petId);
                    if (matchIndex === -1) {
                      petsId.push(item.petId);
                    } else {
                      petsId.splice(matchIndex, 1);
                    }
                    setValue('petsId', petsId);
                  }}
                  style={[
                    styles.pet,
                    {
                      borderColor: item.active
                        ? Colors.primary
                        : colors.borderColor,
                      backgroundColor: item.active
                        ? Colors.primary
                        : isDarkMode
                        ? Colors.lightDark
                        : Colors.background,
                    },
                  ]}>
                  {item.name && (
                    <TitleText
                      text={item.name}
                      textStyle={{
                        textAlign: 'center',
                        paddingVertical: 10,
                        fontWeight: 'bold',
                        color: item.active
                          ? Colors.background
                          : colors.headerText,
                      }}
                    />
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

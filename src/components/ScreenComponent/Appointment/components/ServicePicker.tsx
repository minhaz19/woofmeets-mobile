import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import AppTouchableOpacity from '../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../common/text/TitleText';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../../assets/svgs/Services_SVG';
import Text_Size from '../../../../constants/textScaling';
const data = [
  {
    id: 1,
    title: 'Borading',
    subTitle: 'in the sitters home',
    Icon: BoardingIcon,
  },
  {
    id: 2,
    title: 'House Sitting',
    subTitle: 'in your home',
    Icon: HouseSittingIcon,
  },
  {
    id: 3,
    title: 'Drop-In visits',
    subTitle: 'visits in your home',
    Icon: DropInVisitIcon,
  },
  {
    id: 4,
    title: 'Doggy Day Care',
    subTitle: 'in the sitters home',
    Icon: DoggyDayCareIcon,
  },
  {
    id: 5,
    title: 'Dog Walking',
    subTitle: 'in your neighourhood',
    Icon: DogWalkingIcon,
  },
];
interface Props {
  name: string;
  setValue: (arg: string, arg1: number) => void;
  setServiceId: (arg: number) => void;
}
const ServicePicker = ({name, setValue, setServiceId}: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    subTitle: string;
    id: null | number;
    Icon: any;
  }>({
    title: '',
    subTitle: '',
    id: null,
    Icon: null,
  });
  const [activeServie, setActiveService] = useState(1);

  useMemo(() => {
    const selected = data.filter(item => item.id === activeServie);
    setSelectedService(selected[0]);
    console.log('sel', selected);
  }, [activeServie]);

  return (
    <>
      <TitleText textStyle={styles.header} text={'Provider Services'} />
      <AppTouchableOpacity
        style={styles.selectedContainer}
        onPress={() => setVisible(true)}>
        <View>
          <TitleText
            textStyle={styles.titleText}
            text={selectedService.title}
          />
          <DescriptionText text={selectedService.subTitle} />
        </View>
        <View style={styles.selectedIcon}>
          <selectedService.Icon fill="black" width={30} height={30} />
        </View>
      </AppTouchableOpacity>
      <Modal transparent animationType="slide" visible={visible}>
        <Pressable
          style={styles.container}
          onPress={() => {
            setVisible(false);
          }}
        />
        <View style={styles.pickerContainer}>
          {data.map((item, index) => (
            <AppTouchableOpacity
              key={index}
              style={styles.sectionContainer}
              onPress={() => {
                setActiveService(item.id);
                setVisible(false);
                setValue(name, item.id);
                setServiceId(item.id);
              }}>
              <View>
                <TitleText textStyle={styles.titleText} text={item.title} />
                <DescriptionText text={item.subTitle} />
              </View>
              <View style={styles.iconContainer}>
                <item.Icon fill="black" width={30} height={30} />
              </View>
            </AppTouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};

export default ServicePicker;

const styles = StyleSheet.create({
  header: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,

    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,

    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
  },
  selectedIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 6,
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    // borderColor: ,
    // backgroundColor: Colors.border,
    borderRadius: 6,
  },

  container: {
    flex: 1,

    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    minHeight: 200,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
    backgroundColor: '#f1f1f1',
  },
});

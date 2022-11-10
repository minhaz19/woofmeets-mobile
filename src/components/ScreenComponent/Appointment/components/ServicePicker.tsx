import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
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
import {useAppSelector} from '../../../../store/store';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';

interface Props {
  name: string;
  setValue: (arg: string, arg1: number) => void;
  setServiceId: (arg: number) => void;
}
let modData: any = [];
const getIcon = (iconId: number) => {
  switch (iconId) {
    case 1:
      return BoardingIcon;
    case 2:
      return HouseSittingIcon;
    case 3:
      return DropInVisitIcon;
    case 4:
      return DoggyDayCareIcon;
    case 5:
      return DogWalkingIcon;
  }
};
const ServicePicker = ({name, setValue, setServiceId}: Props) => {
  const [visible, setVisible] = useState(false);
  const {providerServices} = useAppSelector(state => state?.providerServices);
  const [selectedService, setSelectedService] = useState<any>([]);
  useEffect(() => {
    modData = providerServices?.map((item: any) => ({
      id: item.id,
      serviceTypeId: item.serviceTypeId,
      title: item.serviceType.displayName,
      subTitle: item.serviceType.description,
      Icon: getIcon(item.serviceTypeId),
    }));
    modData !== undefined && setSelectedService(modData[0]);
    modData !== undefined &&
      (setValue('serviceTypeId', modData[0].serviceTypeId),
      setValue(name, modData[0].id));
  }, [name, providerServices, setValue]);
  const {isDarkMode, colors} = useTheme();

  console.log('Service Picker');

  return (
    <>
      <TitleText textStyle={styles.header} text={'Provider Services'} />
      <AppTouchableOpacity
        style={styles.selectedContainer}
        onPress={() => setVisible(true)}>
        <View>
          <TitleText
            textStyle={styles.titleText}
            text={selectedService?.title}
          />
          <DescriptionText text={selectedService?.subTitle} />
        </View>
        <View style={styles.selectedIcon}>
          {selectedService?.Icon && (
            <selectedService.Icon fill="black" width={30} height={30} />
          )}
        </View>
      </AppTouchableOpacity>
      <Modal transparent animationType="slide" visible={visible}>
        <Pressable
          style={[styles.container]}
          onPress={() => {
            setVisible(false);
          }}
        />
        <View
          style={[
            styles.pickerContainer,
            {backgroundColor: colors.backgroundColor},
          ]}>
          {modData?.map((item: any, index: number) => (
            <AppTouchableOpacity
              key={index}
              style={[
                styles.sectionContainer,
                {
                  backgroundColor: isDarkMode
                    ? Colors.lightDark
                    : Colors.background,

                  borderColor: colors.borderColor,
                },
              ]}
              onPress={() => {
                setSelectedService(item);
                setValue(name, item.id);
                setValue('serviceTypeId', item.serviceTypeId);
                setServiceId(item.serviceTypeId);
                setVisible(false);
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

export default memo(ServicePicker);

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
    borderWidth: 1,

    // shadowOpacity: 0.08,
    // shadowOffset: {
    //   width: 0,
    //   height: 20,
    // },
    // shadowRadius: 10,
    // // Shadow for Android
    // elevation: 5,
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
  },
});

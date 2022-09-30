import {StyleSheet, TouchableOpacity, View, Image, useColorScheme} from 'react-native';
import React from 'react';
import Ion from 'react-native-vector-icons/Ionicons';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import HeaderText from '../../../common/text/HeaderText';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {selectionData} from '../../../../screens/provider/Reschedule/utils/rescheduleData';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {setSelectService} from '../../../../store/slices/Provider/reschedule/rescheduleSlice';
import TitleText from '../../../common/text/TitleText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  setModalVisible: (arg1: boolean) => void;
  setViewDetails: (arg1: boolean) => void;
}
 
const ServiceSelection = ({setModalVisible, setViewDetails}: Props) => {
  const {colors} = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? colors.lightBackgroundColor
      : colors.backgroundColor
  }
  const dispatch = useAppDispatch();
  const {selectedItem} = useAppSelector((state: any) => state.reschedule);

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Ion
            name="ios-chevron-back"
            size={SCREEN_WIDTH <= 380 ? 20 : SCREEN_WIDTH <= 600 ? 26 : 28}
            style={styles.iconStyle}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <HeaderText text={selectedItem} textStyle={styles.textHeader} />
      </View>
      <View
        style={[styles.divider, {backgroundColor: colors.descriptionText}]}
      />
      <View>
        {selectionData.map(item => {
          return (
            <View key={item.id}>
              <TouchableOpacity
                style={[styles.selectionContainer,{
                  backgroundColor: backgroundStyle.backgroundColor,
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                }]}
                onPress={() => {
                  setViewDetails(false);
                  dispatch(
                    setSelectService({
                      id: item.id,
                      name: item.name,
                      icon: item.icon,
                    }),
                  );
                }}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: item.icon}}
                    resizeMode="cover"
                    style={styles.image}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '85%'}}>
                  <TitleText text={item.name} textStyle={styles.textHeader} />
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
                    style={styles.iconStyle}
                    color={Colors.subText}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={[
                  styles.divider,
                  {backgroundColor: colors.descriptionText},
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ServiceSelection;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 20},
  textHeader: {
    fontSize: Text_Size.Text_0,
  },
  divider: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '1%' : SCREEN_WIDTH <= 600 ? '2%' : '3%',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    paddingRight: 6,
  },
  image: {width: '100%', height: '100%'},
});

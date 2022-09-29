import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
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

interface Props {
  setModalVisible: (arg1: boolean) => void;
  setViewDetails: (arg1: boolean) => void;
}

const ServiceSelection = ({setModalVisible, setViewDetails}: Props) => {
  const {colors} = useTheme();
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
                style={styles.selectionContainer}
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
                <TitleText text={item.name} textStyle={styles.textHeader} />
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
    height: 1,
    opacity: 0.3,
    marginVertical:
      SCREEN_WIDTH <= 380 ? '2%' : SCREEN_WIDTH <= 600 ? '3%' : '5%',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    paddingRight: 6,
  },
  image: {width: '100%', height: '100%'},
});

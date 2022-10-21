import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppTouchableOpacity from '../../../../../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../../../../../common/text/TitleText';
import DescriptionText from '../../../../../../common/text/DescriptionText';
import {CalendarCSvg} from '../../../../../../../assets/svgs/SVG_LOGOS';
import AppCalendar from '../../../../../../common/AppCalendar';
import {useTheme} from '../../../../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../../../../constants/Colors';
import {useFormContext} from 'react-hook-form';
import {SCREEN_WIDTH} from '../../../../../../../constants/WindowSize';
import Text_Size from '../../../../../../../constants/textScaling';

const BScalendar = ({}) => {
  const [visible, setVisible] = useState(false);
  const {isDarkMode} = useTheme();
  const {setValue, watch} = useFormContext();
  const {proposalStartDate, proposalEndDate} = watch();
  return (
    <View>
      <AppTouchableOpacity
        style={[
          styles.sectionContainer,
          {backgroundColor: isDarkMode ? Colors.lightDark : Colors.border},
        ]}
        onPress={() => setVisible(!visible)}>
        <View style={styles.textWidth}>
          <TitleText textStyle={styles.titleText} text={'Dates'} />
          <DescriptionText
            text={
              proposalStartDate !== ''
                ? `( From: ${proposalStartDate} To: ${proposalEndDate})`
                : 'Tap to add dates'
            }
          />
        </View>
        <View style={styles.iconContainer}>
          <CalendarCSvg fill="black" width={30} height={30} />
        </View>
      </AppTouchableOpacity>
      <Modal animated transparent visible={visible} animationType="fade">
        <Pressable
          style={styles.bgContainer}
          onPress={() => setVisible(!visible)}
        />
        <View style={styles.pickerContainer}>
          <View style={styles.calHeader}>
            <TitleText textStyle={styles.title} text={'Select date'} />
            <AppTouchableOpacity onPress={() => setVisible(false)}>
              <TitleText textStyle={styles.calDone} text={'Done'} />
            </AppTouchableOpacity>
          </View>
          <AppCalendar
            selectType={'RANGE'}
            setValue={setValue}
            // markedStyle={markedStyle}
          />
        </View>
      </Modal>
    </View>
  );
};

export default BScalendar;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_1,
    marginBottom: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 6,
  },
  slotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slot: {
    width: (SCREEN_WIDTH - 50) / 2,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.border,
    borderRadius: 10,
  },
  container: {
    paddingVertical: 20,
  },
  pickerContainer: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
  },
  bgContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  calHeader: {
    marginVertical: 20,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_3,
  },
  calDone: {
    fontWeight: 'bold',
    fontSize: Text_Size.Text_2,
  },
  done: {fontWeight: 'bold'},
  textWidth: {width: '85%'},
});

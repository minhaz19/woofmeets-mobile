import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../components/common/text/TitleText';
import DescriptionText from '../../../components/common/text/DescriptionText';
import ShortText from '../../../components/common/text/ShortText';
import LinearGradient from 'react-native-linear-gradient';
import Text_Size from '../../../constants/textScaling';
import Colors from '../../../constants/Colors';
import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
import {useNavigation} from '@react-navigation/native';

const statusCard = [
  {
    id: 1,
    title: "Today's Appointment",
    DescriptionText: 'You will find current running appointments',
    shortText: 'Tap to go >',
    colorOne: '#f2709c',
    colorTwo: '#ff9472',
  },
  {
    id: 2,
    title: 'Up-Coming Appointment',
    DescriptionText: 'You will find all the up-coming appointments',
    shortText: 'Tap to go >',
    colorOne: '#00c6ff',
    colorTwo: '#0072ff',
  },
  {
    id: 3,
    title: 'Past Appointment',
    DescriptionText: 'You will find all the past appointments',
    shortText: 'Tap to go >',
    colorOne: '#fe8c00',
    colorTwo: '#f83600',
  },
];
const Scheduler = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <TitleText textStyle={styles.mainHeader} text={'Find the 🔎'} />
        <TitleText
          textStyle={styles.subHeader}
          text={'Schedule Appoitments 🗓'}
        />
      </View>
      {statusCard?.map((item, index) => (
        <AppTouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('ScheduleAppointmentList', {
              id: item.id,
            });
          }}
          style={[styles.cardStyle, {shadowColor: item.colorTwo}]}>
          <LinearGradient
            colors={[item.colorOne, item.colorTwo]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}>
            <TitleText textStyle={styles.title} text={item.title} />
            <ShortText
              textStyle={styles.shortText}
              text={item.DescriptionText}
            />
            <DescriptionText textStyle={styles.desText} text={item.shortText} />
          </LinearGradient>
        </AppTouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Scheduler;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', margin: 20},
  mainHeader: {
    fontWeight: '900',
    fontSize: Text_Size.Text_6,
    color: Colors.black,
    marginBottom: 10,
  },
  subHeader: {
    fontWeight: '900',
    fontSize: Text_Size.Text_3,
    color: Colors.black,
    marginBottom: 20,
  },
  cardStyle: {
    flex: 0.25,

    height: '30%',
    marginBottom: 20,

    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 23,
  },
  title: {
    fontWeight: '900',
    fontSize: Text_Size.Text_3,
    color: Colors.background,
  },
  shortText: {
    fontWeight: 'bold',
    color: Colors.background,
    marginVertical: 8,
  },
  desText: {
    fontWeight: '900',
    color: Colors.background,
    marginVertical: 8,
  },
});

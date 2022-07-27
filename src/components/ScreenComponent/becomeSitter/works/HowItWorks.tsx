import {View, StyleSheet} from 'react-native';
import React from 'react';
import BigText from '../../../common/text/BigText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import HeaderText from '../../../common/text/HeaderText';
import DescriptionText from '../../../common/text/DescriptionText';

const HowItWorks = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.numberContainer}>
          <View style={styles.numberView}>
            <BigText text="1" />
          </View>
          <View
            style={[styles.lineContainer, {backgroundColor: colors.headerText}]}
          />
        </View>
        <View style={styles.numberContainer}>
          <View style={styles.numberView}>
            <BigText text="2" />
          </View>
          <View
            style={[styles.lineContainer, {backgroundColor: colors.headerText}]}
          />
        </View>
        <View style={styles.numberContainer}>
          <View style={styles.numberView}>
            <BigText text="3" />
          </View>
        </View>
      </View>
      <View style={styles.innerDetailsContainer}>
        <View style={styles.textContainer}>
          <HeaderText text="Create Your Profile" />
          <DescriptionText text="We guide you through building a profile that showcase information pet owners care about." />
        </View>
        <View style={styles.textContainer}>
          <HeaderText text="Accept Requests" />
          <DescriptionText text="Tell us the types of pets you want to care for and the dates that works for you. You make your own schedule" />
        </View>
        <View style={styles.textContainer}>
          <HeaderText text="Get Paid" />
          <DescriptionText text="Payments are ready for withdrawal two days after you have completed a service." />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerDetailsContainer: {
    paddingLeft: 10,
    width: '80%',
  },
  containerInner: {},
  textContainer: {
    paddingBottom: 40,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberView: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 50,
  },
  lineContainer: {
    height: 44,
    width: 1,
  },
});

export default HowItWorks;

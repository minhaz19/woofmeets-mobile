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
          <View style={styles.innerDetailsContainer}>
          <View style={styles.textContainer}>
            <HeaderText text="Create Your Profile" />
            <DescriptionText text="We guide you through building a profile that showcase information pet owners care about." />
          </View>
          </View>
        </View>
        <View
            style={[styles.lineContainer, {backgroundColor: colors.headerText}]}
          />
        <View style={styles.numberContainer}>
          <View style={styles.numberView}>
            <BigText text="2" />
          </View>
          <View style={styles.innerDetailsContainer}>
          <View style={styles.textContainer}>
            <HeaderText text="Accept Requests" />
            <DescriptionText text="Tell us the types of pets you want to care for and the dates that works for you. You make your own schedule" />
          </View>
          </View>
          <View
            style={[styles.lineContainer, {backgroundColor: colors.headerText}]}
          />
        </View>
        <View style={styles.numberContainer}>
          <View style={styles.numberView}>
            <BigText text="3" />
          </View>
          <View style={styles.innerDetailsContainer}>
            <View style={styles.textContainer}>
              <HeaderText text="Get Paid" />
              <DescriptionText text="Payments are ready for withdrawal two days after you have completed a service." />
            </View>
          </View>
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
    flexDirection: 'row',
  },
  numberView: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lineContainer: {
    height: 110,
    width: 1,
    position: 'absolute',
    top: 50,
    marginLeft: 24,
  },
});

export default HowItWorks;

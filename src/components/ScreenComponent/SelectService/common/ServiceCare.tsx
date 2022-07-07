/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {HomeSvg, RepeatSvg} from '../../../../assets/SVG_LOGOS';

interface props {
  hText: string;
  dText: string;
}

const ServiceCare = ({
  hText = 'hello world',
  dText = 'nothing to say this universe',
}: props) => {
  const colors = useTheme();
  return (
    <View>
      <Text style={[styles.hText, {color: colors.colors.headerText}]}>
        {hText}
      </Text>
      <Text style={[styles.dText, {color: colors.colors.descriptionText}]}>
        {dText}
      </Text>
      <View style={styles.boxContainer}>
        <View
          style={[
            styles.box,
            {
              backgroundColor: colors.colors.backgroundColor,
              borderColor: colors.colors.headerText,
            },
          ]}>
          <HomeSvg height={60} width={60} fill={colors.colors.headerText} />
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor: colors.colors.backgroundColor,
              borderColor: colors.colors.headerText,
            },
          ]}>
          <RepeatSvg height={60} width={60} fill={colors.colors.headerText} />
        </View>
      </View>
    </View>
  );
};

export default ServiceCare;

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  box: {
    width: '50%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  hText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dText: {
    fontSize: 12,
  },
});

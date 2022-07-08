/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {HomeSvg, RepeatSvg} from '../../../../assets/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';

interface props {
  hText: string;
  dText: string;
  setServiceType: (type: number) => void;
  serviceType: number;
}

const ServiceCare = ({
  hText = 'hello world',
  dText = 'nothing to say this universe',
  setServiceType,
  serviceType,
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
          style={{
            width: '50%',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => setServiceType(1)}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor:
                    serviceType === 1
                      ? colors.colors.lightBackgroundColor
                      : colors.colors.backgroundColor,
                  borderColor:
                    serviceType === 1
                      ? Colors.primary
                      : colors.colors.lightText,
                },
              ]}>
              <HomeSvg height={60} width={60} fill={colors.colors.headerText} />
            </View>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    serviceType === 1
                      ? Colors.primary
                      : colors.colors.descriptionText,
                },
              ]}>
              One Time
            </Text>
          </View>
        </View>
        <View style={{width: '50%', marginHorizontal: 5}}>
          <TouchableOpacity activeOpacity={1} onPress={() => setServiceType(2)}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor:
                    serviceType === 2
                      ? colors.colors.lightBackgroundColor
                      : colors.colors.backgroundColor,
                  borderColor:
                    serviceType === 2
                      ? Colors.primary
                      : colors.colors.lightText,
                },
              ]}>
              <RepeatSvg
                height={60}
                width={60}
                fill={colors.colors.headerText}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    serviceType === 2
                      ? Colors.primary
                      : colors.colors.descriptionText,
                },
              ]}>
              Repeat Weekly
            </Text>
          </View>
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
    marginVertical: 10,
  },
  box: {
    width: '100%',
    // height: 94,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 30,
  },
  hText: {
    fontSize: Text_Size.Text_1,
    fontWeight: 'bold',
  },
  dText: {
    fontSize: Text_Size.Text_0,
    marginTop: 5,
  },
  text: {
    fontSize: Text_Size.Text_1,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

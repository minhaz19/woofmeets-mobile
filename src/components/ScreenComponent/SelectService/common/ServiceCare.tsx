/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import {HomeSvg, RepeatSvg} from '../../../../assets/SVG_LOGOS';
import Text_Size from '../../../../constants/textScaling';
import Colors from '../../../../constants/Colors';
import ServiceHeader from './ServiceHeader';

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
      <ServiceHeader hText={hText} dText={dText} />
      <View style={styles.boxContainer}>
        <View
          style={{
            width: '47.5%',
            marginHorizontal: 5,
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => setServiceType(1)}>
            <View
              style={[
                styles.box,
                serviceType === 1 && styles.activeCard,
                {
                  backgroundColor:
                    serviceType === 1
                      ? colors.colors.lightBackgroundColor
                      : colors.colors.backgroundColor,
                  borderColor:
                    serviceType === 1
                      ? colors.colors.headerText
                      : colors.colors.inputLightBg,
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
                      : colors.colors.lightText,
                  fontWeight: serviceType === 1 ? '600' : '300',
                },
              ]}>
              One Time
            </Text>
          </View>
        </View>
        <View style={{width: '47.5%', marginHorizontal: 5}}>
          <TouchableOpacity activeOpacity={1} onPress={() => setServiceType(2)}>
            <View
              style={[
                styles.box,
                serviceType === 2 && styles.activeCard,
                {
                  backgroundColor:
                    serviceType === 2
                      ? colors.colors.lightBackgroundColor
                      : colors.colors.backgroundColor,
                  borderColor:
                    serviceType === 2
                      ? colors.colors.headerText
                      : colors.colors.inputLightBg,
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
                      : colors.colors.lightText,
                  fontWeight: serviceType === 2 ? '600' : '300',
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
  activeCard: {
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
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

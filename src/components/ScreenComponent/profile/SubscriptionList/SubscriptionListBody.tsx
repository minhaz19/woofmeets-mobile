/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import TitleText from '../../../common/text/TitleText';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import changeTextLetter from '../../../common/changeTextLetter';
interface Props {
  data: any;
}
const SubscriptionListBody = ({data}: Props) => {
  const {isDarkMode, colors} = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        margin: 20,
        // padding: 10,
        // backgroundColor: Colors.iosBG,
        flex: 1,
      }}>
      <View
        style={{
          padding: 10,
          borderColor: colors.borderColor,
          borderWidth: 1,
          backgroundColor: isDarkMode ? Colors.dark.lightDark : Colors.iosBG,
          marginVertical: 10,
        }}>
        <TitleText
          textStyle={{
            textAlign: 'justify',
            fontWeight: 'bold',
          }}
          text={
            'Here is the short list of your all subscription plans that you have purchase till now. You can find here (Plan Type, Plan Status, Plan End date, Card last 4 digit)'
          }
        />
      </View>

      {data.map((item: any, index: any) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
            marginHorizontal: 4,
          }}>
          <TitleText
            textStyle={{
              fontWeight: '500',
            }}
            text={changeTextLetter(item.name)}
          />
          <TitleText
            textStyle={{
              fontWeight: '500',
            }}
            text={changeTextLetter(item.status)}
          />
          <TitleText
            textStyle={{
              fontWeight: '500',
            }}
            text={changeTextLetter(item.endDate)}
          />
          <TitleText
            textStyle={{
              fontWeight: '500',
            }}
            text={changeTextLetter(item.last4)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default SubscriptionListBody;

const styles = StyleSheet.create({});

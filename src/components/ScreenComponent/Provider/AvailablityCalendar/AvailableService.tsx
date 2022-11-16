/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
interface Props {
  availableService: any;
}
const AvailableService = ({availableService}: Props) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        margin: 20,
      }}>
      <TitleText
        text={'Available Service'}
        textStyle={{
          fontSize: Text_Size.Text_3,
          fontWeight: 'bold',
        }}
      />
      <FlatList
        data={availableService}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item}: any) => (
          <View
            style={{
              marginVertical: 20,
              marginRight: 10,
              padding: 10,
              borderWidth: 1,
              borderColor: colors.borderColor,
            }}>
            <TitleText
              textStyle={{
                fontWeight: 'bold',
                fontSize: Text_Size.Text_1,
                marginBottom: 5,
              }}
              text={item.date}
            />
            {item?.services?.map((it: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 3,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 100,
                    marginRight: 10,
                  }}
                />
                <TitleText text={it} textStyle={{fontWeight: '500'}} />
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <View>
            <TitleText
              textStyle={{
                fontWeight: '500',
                marginTop: 15,
                marginBottom: 10,
              }}
              text={'No Availability found for this particular day'}
            />
          </View>
        }
      />
    </View>
  );
};

export default AvailableService;

const styles = StyleSheet.create({});

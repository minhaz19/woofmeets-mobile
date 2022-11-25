/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {ReactElement} from 'react';
import TitleText from '../../../../../../../common/text/TitleText';
import Colors from '../../../../../../../../constants/Colors';
import {SvgProps} from 'react-native-svg';
import {useTheme} from '../../../../../../../../constants/theme/hooks/useTheme';
import Text_Size from '../../../../../../../../constants/textScaling';
import DescriptionText from '../../../../../../../common/text/DescriptionText';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
interface Props {
  item: {
    title: string;
    Icon?: (props: SvgProps) => ReactElement<any, any>;
    viewAll?: string;
    subInfo: {
      info?: string | undefined;
      description?: string | undefined;
      longDescription?: string | undefined;
    }[];
  };
}
const SitterInfo = ({item}: Props) => {
  const {isDarkMode} = useTheme();
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TitleText textStyle={styles.title} text={item.title} />
          {item.Icon && <item.Icon fill={'black'} />}
        </View>
        {item.title === 'About' ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AboutProvider', {
                description: item.subInfo,
              })
            }>
            <TitleText textStyle={styles.titleBlue} text={item.viewAll} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View>
        {item.subInfo.length === 0 ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo
              name="check"
              size={20}
              color={Colors.green}
              style={styles.iconStyle}
            />
            <DescriptionText
              textStyle={{
                color: Colors.text,
                fontSize: Text_Size.Text_9,
                marginTop: 10,
              }}
              text={'No skill information found'}
            />
          </View>
        ) : (
          item.subInfo.map(inf => (
            <View key={Math.random()} style={styles.info}>
              {inf.info && (
                <View style={{flexDirection: 'row'}}>
                  <Entypo
                    name="check"
                    size={20}
                    color={Colors.green}
                    style={styles.iconStyle}
                  />
                  <DescriptionText
                    textStyle={{
                      color: Colors.text,
                      fontSize: Text_Size.Text_9,
                    }}
                    text={inf.info}
                  />
                </View>
              )}
              {inf?.description && (
                <>
                  <DescriptionText
                    textStyle={{
                      color: Colors.text,
                      fontSize: Text_Size.Text_9,
                    }}
                    text={inf.description}
                  />
                </>
              )}
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default SitterInfo;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  headerContent: {flexDirection: 'row'},
  title: {
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: Text_Size.Text_0,
  },
  titleBlue: {
    marginRight: 5,
    fontWeight: 'bold',
    color: Colors.blue,
  },
  info: {marginVertical: 8},
  iconStyle: {paddingRight: 10},
});

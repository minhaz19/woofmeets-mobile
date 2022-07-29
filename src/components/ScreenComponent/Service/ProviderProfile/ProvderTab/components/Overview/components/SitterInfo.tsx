import {StyleSheet, View} from 'react-native';
import React, {ReactElement} from 'react';
import ShortText from '../../../../../../../common/text/ShortText';
import TitleText from '../../../../../../../common/text/TitleText';
import Colors from '../../../../../../../../constants/Colors';
import {SvgProps} from 'react-native-svg';
interface Props {
  item: {
    title: string;
    Icon?: (props: SvgProps) => ReactElement<any, any>;
    viewAll?: string;
    subInfo: {
      info?: string | undefined;
      description?: string | undefined;
    }[];
  };
}
const SitterInfo = ({item}: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TitleText textStyle={styles.title} text={item.title} />
          {item.Icon && <item.Icon fill={'black'} />}
        </View>
        {item.viewAll && (
          <ShortText textStyle={{color: Colors.primary}} text={item.viewAll} />
        )}
      </View>
      <View>
        {item.subInfo.map(inf => (
          <View key={Math.random()} style={styles.info}>
            {inf.info && <TitleText text={inf.info} />}
            {inf?.description && <ShortText text={inf.description} />}
          </View>
        ))}
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
  title: {marginRight: 5, fontWeight: 'bold'},
  info: {marginVertical: 8},
});

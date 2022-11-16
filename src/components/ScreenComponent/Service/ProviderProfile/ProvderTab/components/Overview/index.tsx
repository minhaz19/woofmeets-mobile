import {StyleSheet, View} from 'react-native';
import React from 'react';
import SitterInfo from './components/SitterInfo';
import SitterMap from './components/SitterMap';
import SitterPets from './components/SitterPets';
import TitleText from '../../../../../../common/text/TitleText';
import {useAppSelector} from '../../../../../../../store/store';
import DescriptionText from '../../../../../../common/text/DescriptionText';
import Colors from '../../../../../../../constants/Colors';
import Text_Size from '../../../../../../../constants/textScaling';
import {useTheme} from '../../../../../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../../../../UI/BottomSpacing';

const Overview = () => {
  const {overview, profileInfo} = useAppSelector(
    state => state.providerProfile,
  );
  const {isDarkMode} = useTheme();
  const changeText = (name: string) => {
    return name[0].toUpperCase() + name?.slice(1);
  };
  const providerDatas = [
    {
      title: `🏡  ${
        changeText(profileInfo?.firstName) +
        ' ' +
        changeText(profileInfo?.lastName)
      } home`,
      viewAll: 'View All',
      subInfo: overview?.sittersHome?.homeAttributes.map((item: any) => ({
        info: item.homeAttributeType?.displayName,
      })),
    },
    {
      title: `🤹‍♀️  ${
        changeText(profileInfo?.firstName) +
        ' ' +
        changeText(profileInfo?.lastName)
      }  skills `,
      viewAll: 'View All',
      subInfo:
        overview?.skills.lenght === 0
          ? []
          : overview.skills.map((item: any) => ({
              info: item.skillType?.title,
            })),
    },
    {
      title: 'About',
      subInfo: [
        {
          description: overview?.about
            ? overview.about
            : 'No about details found...',
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        {providerDatas.map((item, index) => (
          <SitterInfo key={index} item={item} />
        ))}
        <SitterMap />
        <View>
          <TitleText textStyle={styles.petTitle} text="Past Clients" />

          {overview?.pastCLients?.length === 0 ? (
            <DescriptionText
              textStyle={{
                color: Colors.text,
                fontSize: Text_Size.Text_9,
              }}
              text={'No past client found'}
            />
          ) : (
            overview?.pastCLients?.map((_: any, i: number) => (
              <SitterPets key={i} />
            ))
          )}
        </View>
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {},
  petTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

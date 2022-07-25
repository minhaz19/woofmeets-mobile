import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppInputSelectField from '../../../common/Form/AppInputSelectField';
import {Cross, HomeSvgICon, Plus} from '../../../../assets/SVG_LOGOS';
import ConsumerPetList from './ConsumerPetList';
import TitleText from '../../../common/text/TitleText';
import PriceRange from './PriceRange';
import HomeType from './HomeType';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
interface Props {
  handleSubmit: (value: any) => void;
  initialValues: any;
  validationSchema: any;
  onPress?: () => void;
}

const FilterProviderBody = ({
  handleSubmit,
  initialValues,
  validationSchema,
}: Props) => {
  const myPet = [
    {
      image: require('../../../../assets/image/selectServiceImage/mypet.png'),
      name: 'Puppy',
    },
    {
      image: require('../../../../assets/image/selectServiceImage/mypet.png'),
      name: 'Puppy',
    },
    {
      image: require('../../../../assets/image/selectServiceImage/mypet.png'),
      name: 'Puppy',
    },
  ];
  const homeType = [
    {
      type: HomeSvgICon,
    },
    {
      type: HomeSvgICon,
    },
    {
      type: Plus,
    },
  ];
  const renderHeader = () => {
    return (
      <View>
        <AppInputSelectField
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={'Current Location'}
          name={'location'}
          label={'Current Location'}
          Icon={Cross}
        />
        <AppInputSelectField
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={'Select Date Range'}
          name={'dateRange'}
          label={'Date Range'}
          Icon={Cross}
        />
        <View>
          <TitleText textStyle={styles.title} text="My Pet" />
          <FlatList
            data={myPet}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item}) => {
              return <ConsumerPetList image={item.image} name={item.name} />;
            }}
          />
        </View>

        <PriceRange />
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View>
        <FlatList
          data={homeType}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item}) => {
            return <HomeType Icon={item.type} />;
          }}
        />
        <View style={styles.btnContainer}>
          <SubmitButton title="Search Result" />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <FlatList
          data={[]}
          // @ts-ignore
          renderItem={() => console.log('')}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
        />
      </AppForm>
    </View>
  );
};

export default FilterProviderBody;

const styles = StyleSheet.create({
  container: {marginTop: 10, marginBottom: 20},
  btnContainer: {
    marginTop: 10,
    marginBottom: SCREEN_WIDTH < 390 ? 30 : 0,
  },
  title: {fontSize: Text_Size.Text_0, fontWeight: 'bold'},
});

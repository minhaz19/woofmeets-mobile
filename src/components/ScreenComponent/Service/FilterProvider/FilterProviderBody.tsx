/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppForm from '../../../common/Form/AppForm';
import AppInputSelectField from '../../../common/Form/AppInputSelectField';
import {Cross} from '../../../../assets/svgs/SVG_LOGOS';
import ConsumerPetList from './ConsumerPetList';
import TitleText from '../../../common/text/TitleText';
import PriceRange from './PriceRange';
import HomeType from './HomeType';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DateRange from '../../../common/DateRange';
import FilterSwitch from './FilterSwitch';
import HeaderText from '../../../common/text/HeaderText';
import BottomSpacing from '../../../UI/BottomSpacing';
import AppButton from '../../../common/AppButton';
import {
  filterPetSwitch,
  homeType,
  myPet,
} from '../../../../utils/config/Data/filterProviderDatas';

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
  const [openCal, setOpenCal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(0);
  const [selectedHome, setSelectedHome] = useState(0);

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
          onPress={() => setOpenCal(!openCal)}
        />
        {openCal && <DateRange name="dateRange" />}
        <View>
          <TitleText textStyle={styles.title} text="My Pet" />
          <FlatList
            data={myPet}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({item, index}) => {
              return (
                <ConsumerPetList
                  image={item.image}
                  name={item.name}
                  index={index}
                  selected={selectedPet}
                  onPress={() => setSelectedPet(index)}
                />
              );
            }}
          />
        </View>
        <View>
          <PriceRange />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View>
        <TitleText textStyle={styles.title} text="Home Type" />
        <FlatList
          data={homeType}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          renderItem={({item, index}) => {
            return (
              <HomeType
                Icon={item.type}
                index={index}
                selected={selectedHome}
                text={item.title}
                onPress={() => setSelectedHome(index)}
              />
            );
          }}
        />
        <View>
          {filterPetSwitch.map((item, index) => (
            <View key={index} style={styles.switch}>
              <HeaderText text={item.heading} textStyle={{marginBottom: 10}} />
              {item.switch.map((switchItem, i) => (
                <FilterSwitch
                  key={i}
                  name={switchItem.name}
                  title={switchItem.title}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.btnContainer}>
          <SubmitButton title="Search Result" />
          <AppButton title="cancel" />
        </View>
        <BottomSpacing />
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
          renderItem={() => {}}
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
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  switch: {
    marginBottom: 20,
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: SCREEN_WIDTH < 390 ? 30 : 0,
  },
  title: {fontSize: Text_Size.Text_0, fontWeight: 'bold'},
});

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BigText from '../../../../common/text/BigText';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import ServiceForm from '../Common/ServiceForm';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Text_Size from '../../../../../constants/textScaling';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import AppCheckboxField from '../../../../common/Form/AppCheckboxField';
import {useFormContext} from 'react-hook-form';
import {useSubRates} from './ulils/useSubRates';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import {useAppDispatch, useAppSelector} from '../../../../../store/store';
import {setOpenFilter} from '../../../../../store/slices/misc/openFilter';

interface Props {
  handleRates: (arg: any) => void;
  rateFields: any;
  loading: boolean;
}

const SubRates = ({handleRates, rateFields, loading}: Props) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state: any) => state.filter.isOpen);
  const {
    formState: {errors},
    control,
    setValue,
    watch,
  } = useFormContext();
  const {
    baseRateWatch,
    handlePress,
    rates,
    showAdditionalRates,
    updateRates,
    setUpdateRates,
    checked,
  } = useSubRates(rateFields, watch);
  console.log('rates', rates);
  return (
    <View>
      <ServiceReusableModal
        modalVisible={filter}
        // setModalVisible={setModalVisible}
      />
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <BigText text={'Rates'} textStyle={styles.headerText} />
          <TouchableOpacity
            onPress={() => dispatch(setOpenFilter(true))}
            style={styles.iconContainer}>
            <QuestionIcon fill={Colors.primary} />
          </TouchableOpacity>
        </View>
        {rates?.map(
          (
            item: {
              slug: string;
              name: string;
              unitLabel: string;
              percentage: number;
            },
            index: number,
          ) => {
            return (
              <View key={index}>
                {item.slug === 'base-rate' && (
                  <>
                    <ServiceForm
                      autoCapitalize="none"
                      autoCorrect={false}
                      checkbox={
                        'Update my additional rates based on my base rate'
                      }
                      keyboardType={'numeric'}
                      textContentType={'none'}
                      name={item.slug.replace('-', '')}
                      percentage={item.percentage}
                      label={item.name}
                      handlePress={handlePress}
                      showAdditionalRates={showAdditionalRates}
                      checkPress={() => {
                        setUpdateRates(!updateRates);
                      }}
                      control={control}
                      errors={errors}
                      editable={true}
                      setValue={setValue}
                    />
                    <AppCheckboxField
                      title={'Update my additional rates based on my base rate'}
                      square
                      active={!updateRates}
                      onPress={() => {
                        setUpdateRates(!updateRates);
                      }}
                      name={'updateRates'}
                      errors={errors}
                      control={control}
                    />
                    <DescriptionText
                      textStyle={styles.shortText}
                      text={'Turn off and adjust your rate manully'}
                    />
                  </>
                )}
                {item.slug !== 'base-rate' && (
                  <ServiceForm
                    key={index}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    textContentType={'none'}
                    name={item.slug.replace('-', '').replace('-', '')}
                    label={item.name}
                    handlePress={handlePress}
                    percentage={item.percentage}
                    showAdditionalRates={showAdditionalRates}
                    editable={updateRates}
                    control={control}
                    errors={errors}
                    baseRateWatch={baseRateWatch}
                    convertedValue={(baseRateWatch / 100) * item.percentage}
                    setValue={setValue}
                    updateRates={updateRates}
                    checked={checked}
                  />
                )}
              </View>
            );
          },
        )}

        <View>
          {!showAdditionalRates && (
            <DescriptionText
              text={'How are additional rates used ?'}
              textStyle={styles.linkText}
            />
          )}
          {!showAdditionalRates && (
            <TouchableOpacity onPress={handlePress}>
              <DescriptionText
                text="Hide additional rates"
                textStyle={{color: Colors.primary}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.submitContainer}>
        <SubmitButton
          title="Save & continue"
          onPress={handleRates}
          loading={loading}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default SubRates;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    lineHeight: 20,
  },
  subHeaderText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
  },
  linkText: {
    color: Colors.primary,
    marginVertical: '2%',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  infoText: {
    paddingLeft: 10,
    fontSize: Text_Size.Text_8,
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
  },
  shortText: {
    color: Colors.gray,
    marginVertical: '2%',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  iconContainer: {
    paddingLeft: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

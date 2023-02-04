/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import {
  availabilityInput,
  availabilityHomeFullTimeInDay,
  availabilitySelectDay,
} from '../../../../../screens/becomeSitter/ServiceSetUp/Availability/utils/AvailabilityData';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import DescriptionText from '../../../../common/text/DescriptionText';
import {useFormContext} from 'react-hook-form';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';

import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import {useHandleMultipleActiveCheck} from '../handleCheck/HandleCheck';
import Colors from '../../../../../constants/Colors';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {useAppSelector} from '../../../../../store/store';

interface Props {
  handlePost: (arg1: any) => void;
  loading: boolean;
}
const SubAvailability = ({handlePost, loading}: Props) => {
  const {dayError} = useAppSelector(state => state.filter);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {newData, handleMultipleCheck} = useHandleMultipleActiveCheck(
    availabilitySelectDay.options,
  );
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const data = getValues();
  const {colors} = useTheme();
  return (
    <View>
      <ServiceReusableModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        question={'Why is availability important?'}
        description={
          'Letting your potential clients know about your availability is a crucial part of setting up your profile that you should not overlook. Allowing pet owners who are browsing the Woofmeets site a chance to see your weekly schedule is the first step toward seeing whether you’re going to be compatible with them. Be sure to immediately update the availability on your profile for each day if you ever want to make any changes.'
        }
      />
      <View style={styles.headerContainer}>
        <View style={styles.flexContainer}>
          <BigText text={'Availability'} textStyle={styles.headerText} />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconContainer}>
            <QuestionIcon fill={Colors.primary} />
          </TouchableOpacity>
        </View>
        {/* <View>
          <HeaderText text={availabilityInput.title} />
          <View style={styles.fullTimeContainer}>
            {availabilityInput.options?.map((item, index) => {
              return (
                <ServiceCheckbox
                  title={item.type}
                  key={index}
                  radio
                  typeKey={item.checked}
                  onPress={() => {
                    setValue(availabilityInput.name, item.checked, {
                      shouldValidate: true,
                    });
                  }}
                  name={availabilityInput.name}
                  control={control}
                />
              );
            })}
          </View>
          <ErrorMessage error={errors[availabilityInput.name!]?.message} />
        </View> */}
        <View style={{marginTop: '3%'}}>
          <HeaderText
            text={availabilitySelectDay.title}
            textStyle={styles.subHeaderText}
          />
          {availabilitySelectDay.subtitle && (
            <DescriptionText
              text={availabilitySelectDay.subtitle}
              textStyle={{
                ...styles.subHeaderText,
                color: colors.descriptionText,
              }}
            />
          )}
          <View style={styles.dayBoxContainer}>
            {newData?.map(
              (
                item: {type: string; id: number; value: boolean; name: string},
                index: React.Key | null | undefined,
              ) => (
                <ServiceCheckbox
                  title={item.type}
                  key={index}
                  square
                  typeKey={item.id}
                  active={data[item.name]}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                    setValue(item.name, item.value, {
                      shouldValidate: false,
                    });
                  }}
                  name={item.name}
                  control={control}
                />
              ),
            )}
          </View>

          {dayError && <ErrorMessage error={'Day must be selected'} />}
        </View>
        <View style={styles.headerContainer}>
          <HeaderText text={availabilityHomeFullTimeInDay.title} />
          {availabilityHomeFullTimeInDay.options?.map((item, index) => {
            return (
              <ServiceCheckbox
                title={item.type}
                key={index}
                radio
                typeKey={item.type}
                onPress={() => {
                  setValue(availabilityHomeFullTimeInDay.name, item.type, {
                    shouldValidate: true,
                  });
                }}
                name={availabilityHomeFullTimeInDay.name}
                control={control}
              />
            );
          })}
        </View>
        <ErrorMessage
          error={errors[availabilityHomeFullTimeInDay.name!]?.message}
        />
        <View style={styles.submitContainer}>
          <SubmitButton
            title={'Save & Continue'}
            onPress={handlePost}
            loading={loading}
          />
        </View>
        <BottomSpacing />
      </View>
    </View>
  );
};

export default SubAvailability;

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
  subtitle: {
    paddingBottom: '1%',
    lineHeight: 20,
  },
  dayBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: '2%',
  },
  fullTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  submitContainer: {
    marginTop: SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '6%' : '3%',
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

/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import {
  availabilityHomeFullTimeInDay,
  availabilitySelectDay,
} from '../../../../../screens/becomeSitter/ServiceSetUp/Availability/utils/AvailabilityData';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import DescriptionText from '../../../../common/text/DescriptionText';
import {useFormContext} from 'react-hook-form';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import {useHandleMultipleActiveCheck} from '../handleCheck/HandleCheck';
import Colors from '../../../../../constants/Colors';
import {QuestionIcon} from '../../../../../assets/svgs/SVG_LOGOS';
import ServiceReusableModal from '../Common/ServiceReusableModal';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';


const SubAvailability = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  const {
    availability: {availableDaysOptions, availableDays, onSetAvailableDays},
  } = useHandleMultipleActiveCheck();

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
      <View
        style={{
          paddingTop:
            SCREEN_WIDTH <= 380 ? '6%' : SCREEN_WIDTH <= 600 ? '5%' : '3%',
        }}>
        <View style={styles.flexContainer}>
          <BigText text={'Availability'} textStyle={styles.headerText} />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconContainer}>
            <QuestionIcon fill={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View>
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
            <View style={styles.container}>
              {availableDaysOptions?.map(day => (
                <Pressable
                  onPress={() => {
                    onSetAvailableDays(day);
                  }}
                  style={[
                    styles.box,
                    {
                      borderWidth: 1,
                      borderColor: availableDays[day]
                        ? Colors.primaryDeep
                        : 'gray',
                      backgroundColor: availableDays[day]
                        ? Colors.washedPrimary
                        : 'white',
                    },
                  ]}
                  key={day}>
                  <HeaderText
                    textStyle={{
                      ...styles.text,
                      color: availableDays[day] ? Colors.primaryDeep : 'black',
                    }}
                    text={day?.charAt(0).toUpperCase() + day.slice(1)}
                  />
                </Pressable>
              ))}
            </View>
          </View>
          <ErrorMessage error={errors[availabilitySelectDay.name!]?.message} />
        </View>
        <View style={styles.headerContainer}>
          <HeaderText text={availabilityHomeFullTimeInDay.title} />
          <View style={styles.pottyStyle}>
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
        </View>
        <ErrorMessage
          error={errors[availabilityHomeFullTimeInDay.name!]?.message}
        />
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
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    margin: 4,
    paddingVertical: 4,
  },
  text: {
    paddingHorizontal: 8,
  },
  pottyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

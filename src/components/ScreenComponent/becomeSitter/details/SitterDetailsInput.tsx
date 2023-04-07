/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppFormField from '../../../common/Form/AppFormField';
import SubmitButton from '../../../common/Form/SubmitButton';
import Text_Size from '../../../../constants/textScaling';
import HeaderText from '../../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import Colors from '../../../../constants/Colors';
import ServiceCheckbox from '../ServiceSetup/Common/ServiceCheckbox';
import {skillsData} from '../../../../screens/becomeSitter/Details/utils/SkillsData';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import {useAppSelector} from '../../../../store/store';
import ErrorMessage from '../../../common/Form/ErrorMessage';

const sitterDetailsInputValue = [
  {
    title: 'Years of personal experience caring for pets',
    name: 'yearsOfExperience',
    numberOfLines: 1,
  },
  {
    title: 'Write an eye-catching headline',
    name: 'headline',
    numberOfLines: 1,
  },
  {
    title: 'Pet care experience',
    name: 'experienceDescription',
    numberOfLines: 12,
    multiline: true,
  },
];

const SitterDetailsInput = (props: {
  handleSubmit?: any;
  isLoading?: boolean;
  attributes?: any;
  profileSetup?: boolean;
}) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const data = getValues();
  const skillsDetailsData = useAppSelector(state => state.details.skillsData);
  const [newData, setNewData] = useState<any>(data.skills ? data.skills : []);
  // check the select and deselect value
  const handleMultipleCheck = (id: number) => {
    const newArray = [...data.skills];
    const tempData = newArray.includes(id);
    if (tempData) {
      const deleteId = newArray.filter(item => item !== id);
      setNewData(deleteId);
      setValue('skills', deleteId, {shouldValidate: true});
    } else {
      const addId = newArray;
      addId.push(id);
      setNewData(addId);
      setValue('skills', addId, {shouldValidate: true});
    }
  };
  return (
    <View style={styles.container}>
      <HeaderText
        text="Pet Care Experience"
        textStyle={{...styles.textStyle, paddingBottom: 10}}
      />
      <View>
        {sitterDetailsInputValue.map((item, index) => {
          return (
            <View key={index}>
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={
                  item.name === 'yearsOfExperience' ? 'number-pad' : 'default'
                }
                textContentType={'none'}
                name={item.name}
                label={item.title}
                textInputStyle={styles.textInputStyle}
                control={control}
                errors={errors}
                numberOfLines={item.numberOfLines}
                multiline={item?.multiline}
              />
            </View>
          );
        })}
      </View>
      <View style={{marginTop: '3%'}}>
        <HeaderText text={skillsData.title} textStyle={styles.subHeaderText} />
        <View style={styles.dayBoxContainer}>
          {skillsDetailsData &&
            skillsDetailsData?.map(
              (
                item: {title: string; id: number; slug: string; active: any},
                index: React.Key | null | undefined,
              ) => (
                <ServiceCheckbox
                  title={item.title}
                  key={index}
                  square
                  typeKey={item?.id}
                  active={newData !== null && newData.includes(item?.id)}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                  }}
                  name={item.slug}
                  control={control}
                />
              ),
            )}
        </View>
        <ErrorMessage error={errors[skillsData.name!]?.message} />
      </View>
      {props?.profileSetup ? null : (
        <View style={styles.footerContainer}>
          <SubmitButton
            title="Save"
            onPress={props.handleSubmit}
            loading={props.isLoading}
          />
        </View>
      )}
    </View>
  );
};

export default SitterDetailsInput;

const styles = StyleSheet.create({
  container: {},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  textStyle1: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
    padding: 20,
  },
  footerContainer: {
    paddingVertical: '6%',
  },
  titleStyle: {
    color: Colors.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_1,
    flex: 1,
  },
  errorText: {
    color: Colors.alert,
  },
  subHeaderText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
  },
  dayBoxContainer: {
    paddingVertical: '2%',
  },
});

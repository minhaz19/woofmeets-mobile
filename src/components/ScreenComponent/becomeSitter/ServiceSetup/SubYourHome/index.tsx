/* eslint-disable dot-notation */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BigText from '../../../../common/text/BigText';
import HeaderText from '../../../../common/text/HeaderText';
import {useFormContext} from 'react-hook-form';
import {YourHomeData} from '../../../../../screens/becomeSitter/ServiceSetUp/YourHome/utils/YourHomeData';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import SubmitButton from '../../../../common/Form/SubmitButton';
import DescriptionText from '../../../../common/text/DescriptionText';
import Colors from '../../../../../constants/Colors';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import BottomSpacing from '../../../../UI/BottomSpacing';

interface Props {
  postLoading?: boolean;
  handlePost: (arg1: any) => void;
  attributes: any;
}

const SubYourHome = ({handlePost, postLoading, attributes}: Props) => {
  // const [newData, setNewData] = useState<any>([]);
  // console.log('newData', newData);
  const {
    control,
    setValue,
    formState: {errors},
  } = useFormContext();
  const {colors} = useTheme();
  // const handleSetValue = (id: number, name: string) => {
  //   const newArray: any[] | ((prevState: never[]) => never[]) = [];
  //   const index = newArray.findIndex(item => item.id === id);
  //   newArray[index].value = !newArray[index]?.value;
  //   setNewData(newArray);
  //   const updatedActiveId = newArray
  //     .filter((item: any) => item.id === id)
  //     .map((item: any) => item.value);
  //   console.log('updatedActiveId', updatedActiveId);
  //   setValue(name, updatedActiveId[0]);
  // };
  return (
    <View>
      <BigText text={'Availability'} textStyle={styles.headerText} />
      <View>
        {YourHomeData.map((data: any, index: number) => {
          return (
            <View key={index} style={{marginTop: 10}}>
              <HeaderText text={data?.title} />
              <View style={styles.fullTimeContainer}>
                {data.options?.map(
                  (
                    item: {type: string; value: any},
                    i: React.Key | null | undefined,
                  ) => {
                    return (
                      <ServiceCheckbox
                        title={item.type}
                        key={i}
                        radio
                        typeKey={item.value}
                        onPress={() => {
                          setValue(data.name, item.value, {
                            shouldValidate: true,
                          });
                        }}
                        name={data.name}
                        control={control}
                      />
                    );
                  },
                )}
              </View>
              <ErrorMessage error={errors[data.name]?.message} />
            </View>
          );
        })}
      </View>
      {attributes.length > 0 && (
        <View>
          <HeaderText
            text={attributes[0].displayName}
            textStyle={styles.subTex}
          />
          <DescriptionText
            text={'(Check All That Apply)'}
            textStyle={{
              ...styles.subHeaderText,
              color: colors.descriptionText,
            }}
          />

          {attributes[0]?.homeAttributeType?.map(
            (item: any, i: React.Key | null | undefined) => {
              return (
                <ServiceCheckbox
                  title={item?.displayName}
                  key={i}
                  square
                  typeKey={item?.id}
                  active={true}
                  onPress={() => {
                    // handleMultipleCheck(item.id);
                    // setValue(item.name, !item.value, {
                    //   shouldValidate: true,
                    // });
                    // handleSetValue(item.id, item.name);
                  }}
                  name={'expect'}
                  control={control}
                />
              );
            },
          )}
          <ErrorMessage error={errors['expect']?.message} />

          <HeaderText
            text={attributes[1].displayName}
            textStyle={styles.subTex}
          />
          <DescriptionText
            text={'(Check All That Apply)'}
            textStyle={{
              ...styles.subHeaderText,
              color: colors.descriptionText,
            }}
          />

          {attributes[1]?.homeAttributeType?.map(
            (item: any, i: React.Key | null | undefined) => {
              return (
                <ServiceCheckbox
                  title={item?.displayName}
                  key={i}
                  square
                  typeKey={item?.id}
                  active={true}
                  onPress={() => {
                    // handleMultipleCheck(item.id);
                    // setValue(item.name, !item.value, {
                    //   shouldValidate: true,
                    // });
                    // handleSetValue(item.id, item.name);
                  }}
                  name={'host'}
                  control={control}
                />
              );
            },
          )}
          <ErrorMessage error={errors['host']?.message} />
        </View>
      )}
      <View style={styles.submitContainer}>
        <SubmitButton
          title={'Save & Continue'}
          onPress={handlePost}
          loading={postLoading}
        />
      </View>
      <BottomSpacing />
    </View>
  );
};

export default SubYourHome;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  headerText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
    lineHeight: 20,
  },
  subHeaderText: {
    paddingBottom:
      SCREEN_WIDTH <= 380 ? '3%' : SCREEN_WIDTH <= 600 ? '2%' : '1%',
    lineHeight: 20,
    color: Colors.gray,
  },
  subTex: {
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
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
});

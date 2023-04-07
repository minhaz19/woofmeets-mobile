import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import Colors from '../../../../../constants/Colors';
import {useFormContext} from 'react-hook-form';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {YourHomeData} from '../../../../../screens/becomeSitter/ServiceSetUp/YourHome/utils/YourHomeData';
import HeaderText from '../../../../common/text/HeaderText';
import ServiceCheckbox from '../Common/ServiceCheckbox';
import DescriptionText from '../../../../common/text/DescriptionText';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
import Divider from '../../../../UI/Divider';

interface Props {
  attributes: any;
}

const NewSubYourHome = ({attributes}: Props) => {
  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const {colors} = useTheme();
  const selectData = getValues();
  const [newData, setNewData] = useState<any>(
    selectData.homeAttributes ? selectData.homeAttributes : [],
  );

  //   filter none of the above
  const ownerFilterAttData =
    attributes &&
    attributes[0]?.homeAttributeType.filter(
      (attr: {displayName: string}) =>
        attr.displayName.toLowerCase() !== 'none of the above',
    );
  const hostFilterAttData =
    attributes &&
    attributes[1]?.homeAttributeType.filter(
      (attr: {displayName: string}) =>
        attr.displayName.toLowerCase() !== 'none of the above',
    );
  // check the select and deselect value
  const handleMultipleCheck = (id: number) => {
    const newArray = [...selectData.homeAttributes];
    const tempData = newArray.includes(id);
    if (tempData) {
      const deleteId = newArray.filter(item => item !== id);
      setNewData(deleteId);
      setValue('homeAttributes', deleteId, {shouldValidate: true});
    } else {
      const addId = newArray;
      addId.push(id);
      setNewData(addId);
      setValue('homeAttributes', addId, {shouldValidate: true});
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View>
        {YourHomeData?.map((data: any, index: number) => {
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
      {attributes?.length > 0 && (
        <View>
          <HeaderText
            text={`${attributes[0]?.displayName} (Optional)`}
            textStyle={styles.subTex}
          />
          <DescriptionText
            text={'(Check All That Apply)'}
            textStyle={{
              ...styles.subHeaderText,
              color: colors.descriptionText,
            }}
          />

          {ownerFilterAttData?.map(
            (item: any, i: React.Key | null | undefined) => {
              return (
                <ServiceCheckbox
                  title={item?.displayName}
                  key={i}
                  square
                  typeKey={item?.id}
                  active={newData !== null && newData.includes(item?.id)}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                  }}
                  name={'ownerAttributes'}
                  control={control}
                />
              );
            },
          )}
          {/* <ErrorMessage error={errors['homeAttributes']?.message} /> */}

          <HeaderText
            text={`${attributes[1]?.displayName} (Optional)`}
            textStyle={styles.subTex}
          />
          <DescriptionText
            text={'(Check All That Apply)'}
            textStyle={{
              ...styles.subHeaderText,
              color: colors.descriptionText,
            }}
          />

          {hostFilterAttData?.map(
            (item: any, i: React.Key | null | undefined) => {
              return (
                <ServiceCheckbox
                  title={item?.displayName}
                  key={i}
                  square
                  typeKey={item?.id}
                  active={newData !== null && newData.includes(item?.id)}
                  onPress={() => {
                    handleMultipleCheck(item.id);
                  }}
                  name={'hostAttributes'}
                  control={control}
                />
              );
            },
          )}
          {/* <ErrorMessage error={errors['homeAttributes']?.message} /> */}
        </View>
      )}
      <Divider />
    </View>
  );
};

export default NewSubYourHome;

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
    flexWrap: 'wrap',
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

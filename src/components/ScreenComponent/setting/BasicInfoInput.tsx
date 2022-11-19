/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import Text_Size from '../../../constants/textScaling';
import HeaderText from '../../common/text/HeaderText';
import ProfileHeader from '../profile/BasicInfo/ProfileHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useFormContext} from 'react-hook-form';
import {contries} from '../../../utils/config/Data/AddPetData';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AppSelectField from '../../common/Form/AppSelectField';
import {
  basicInfoInput,
  locationInput,
} from '../../../utils/config/Data/basicInfoDatas';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {getUserProfileInfo} from '../../../store/slices/userProfile/userProfileAction';
import DescriptionText from '../../common/text/DescriptionText';
import AppDropDownSelect from '../../common/AppDropDownSelect';
import {states} from '../../../screens/profile/BasicInfo/utils/basicInfoState';
import GooglePredictLocation from '../../common/GooglePredictLocations';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
}

const BasicInfoInput = ({handleSubmit, loading}: Props) => {
  const {loading: gLoading, userInfo} = useAppSelector(
    state => state?.userProfile,
  );
  const image = userInfo?.image;
  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;

  const {
    control,
    setValue,
    getValues,
    formState: {errors},
  } = useFormContext();
  const dispatch = useAppDispatch();
  const basicData = getValues();

  // add google address
  const onPressAddress = (details: any) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const zipCode = details?.address_components.find((addressComponent: any) =>
      addressComponent.types.includes('postal_code'),
    )?.short_name;
    const city = details?.address_components.find((addressComponent: any) =>
      addressComponent.types.includes('locality'),
    )?.short_name;
    const state = details?.address_components.find((addressComponent: any) =>
      addressComponent.types.includes('administrative_area_level_1'),
    )?.long_name;
    const country = details?.address_components.find((addressComponent: any) =>
      addressComponent.types.includes('country'),
    )?.short_name;
    // setValue('addressLine1', details?.formatted_address);
    setValue('lat', lat);
    setValue('lng', lng);
    setValue('city', city ? city : '');
    setValue('state', state ? state : '');
    setValue('zipCode', zipCode ? zipCode : '');
    setValue(
      'countryId',
      country === 'US' ? '1' : country === 'CA' ? '2' : null,
      {
        shouldValidate: true,
      },
    );
  };

  const renderHeader = useCallback(() => {
    return (
      <>
        <ProfileHeader
          name="profileImage"
          gLoading={gLoading}
          url={image?.url}
          userName={firstName ? firstName + ' ' + lastName : ''}
        />
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <HeaderText text="Basic Information" textStyle={styles.textStyle} />
          </View>
          <View>
            <FlatList
              data={basicInfoInput}
              renderItem={({item}) => {
                return (
                  <>
                    <AppFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'default'}
                      placeholder={item.placeholder}
                      textContentType={'none'}
                      name={item.name}
                      label={item.title}
                      errors={errors}
                      control={control}
                    />
                  </>
                );
              }}
              keyExtractor={(item, index) => item.name + index.toString()}
            />
          </View>
          <View style={styles.nameContainer}>
            <HeaderText text="Add your address" textStyle={styles.textStyle} />
            <DescriptionText
              text={
                'Your address is only shown to your client when their pet stays in your home'
              }
            />
          </View>
        </View>
      </>
    );
  }, [control, errors, firstName, gLoading, image?.url, lastName]);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" onPress={handleSubmit} loading={loading} />
        </View>
        <BottomSpacing />
      </View>
    );
  }, [handleSubmit, loading]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getUserProfileInfo());
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);
  return (
    <KeyboardAwareFlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={locationInput}
      horizontal={false}
      extraHeight={60}
      extraScrollHeight={120}
      showsVerticalScrollIndicator={false}
      renderItem={useCallback(
        ({item}) => {
          return (
            <>
              {!item.select && (
                <View style={styles.inputContainer}>
                  {item.name === 'addressLine1' ? (
                    // <GoogleAutoComplete
                    //   onPressAddress={onPressAddress}
                    //   label={item.title}
                    //   placeholder={
                    //     previousLocation ? previousLocation : item.placeholder
                    //   }
                    // />
                    <GooglePredictLocation
                      label={item.title}
                      placeholder={item.placeholder}
                      name={'addressLine1'}
                      defaultValue={getValues('addressLine1')}
                      onChange={value => {
                        setValue('addressLine1', value);
                      }}
                      onPlaceSelected={onPressAddress}
                      errors={errors}
                    />
                  ) : item.name === 'state' ? (
                    <AppDropDownSelect
                      title={item.title}
                      setValue={setValue}
                      name={item.name}
                      data={states}
                      valueData={basicData.state}
                      placeholder={item.placeholder}
                      errors={errors}
                    />
                  ) : (
                    <AppFormField
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType={'default'}
                      placeholder={item.placeholder}
                      textContentType={'none'}
                      name={item.name}
                      label={item.title}
                      textInputStyle={styles.textInputStyle}
                      control={control}
                      errors={errors}
                      // defaultValue={basicInfo?.[item.name]}
                    />
                  )}
                </View>
              )}
              {item.select && (
                <View style={styles.selectContainer}>
                  <AppSelectField
                    label={item.title}
                    name={'countryId'}
                    data={contries}
                    control={control}
                    defaultText={basicData.countryId}
                    placeholder={'Please select a country'}
                  />
                </View>
              )}
            </>
          );
        },
        [control, errors, getValues, setValue],
      )}
      keyExtractor={(item, index) => item.name + index.toString()}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}>
      <BottomSpacing />
    </KeyboardAwareFlatList>
  );
};

export default BasicInfoInput;

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
    position: 'relative',
  },
  headerContainer: {
    marginHorizontal: '5%',
    width: '90%',
  },
  inputContainer: {marginHorizontal: '5%', width: '90%'},
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  selectContainer: {width: '90%', marginHorizontal: '5%'},
  textInputStyle: {},
  nameContainer: {
    paddingVertical: SCREEN_WIDTH <= 800 ? '5%' : '3%',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: Text_Size.Text_2,
    fontWeight: 'bold',
  },
  footerContainer: {
    paddingVertical: '6%',
    marginBottom: '6%',
  },
});

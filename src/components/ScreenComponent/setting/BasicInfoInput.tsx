/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppFormField from '../../common/Form/AppFormField';
import SubmitButton from '../../common/Form/SubmitButton';
import HeaderText from '../../common/text/HeaderText';
import ProfileHeader from '../profile/BasicInfo/ProfileHeader';
import BottomSpacing from '../../UI/BottomSpacing';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {useFormContext, useWatch} from 'react-hook-form';
import {countries} from '../../../utils/config/Data/AddPetData';
import {useAppSelector} from '../../../store/store';
import AppSelectField from '../../common/Form/AppSelectField';
import {locationInput} from '../../../utils/config/Data/basicInfoDatas';
import DescriptionText from '../../common/text/DescriptionText';
import AppDropDownSelect from '../../common/AppDropDownSelect';
import {
  americanStates,
  canadaStates,
} from '../../../screens/profile/BasicInfo/utils/basicInfoState';
import GooglePredictLocation from '../../common/GooglePredictLocations';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import MiddleModal from '../../UI/modal/MiddleModal';
import AppInput from '../../common/Form/AppInput';
import {format} from 'date-fns';
import AppTouchableOpacity from '../../common/AppClickEvents/AppTouchableOpacity';
import TitleText from '../../common/text/TitleText';
import Text_Size from '../../../constants/textScaling';
import ErrorMessage from '../../common/Form/ErrorMessage';

interface Props {
  handleSubmit: (value: any) => void;
  loading: boolean;
}

const BasicInfoInput = ({handleSubmit, loading}: Props) => {
  // const [countryId, setCountryId] = useState('1');
  const [date, setDate] = useState(new Date());
  const [shown, setShown] = useState(false);
  const {loading: gLoading, userInfo} = useAppSelector(
    state => state?.userProfile,
  );
  const image = userInfo?.image;
  const firstName = userInfo?.firstName;
  const lastName = userInfo?.lastName;

  const {
    control,
    setValue,
    formState: {errors},
    setError,
  } = useFormContext();
  const basicData = useWatch();

  // add google address
  const onPressAddress = (details: any) => {
    const lat = details?.geometry.location.lat;
    const lng = details?.geometry.location.lng;
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
    setValue('latitude', lat);
    setValue('longitude', lng);
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
    setError('city', {type: 'custom', message: undefined});
    setError('state', {type: 'custom', message: undefined});
    setError('zipCode', {type: 'custom', message: undefined});
    setError('countryId', {type: 'custom', message: undefined});
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ProfileHeader
        name="profileImage"
        gLoading={gLoading}
        url={image?.url}
        userName={firstName ? firstName + ' ' + lastName : ''}
        errors={errors}
      />
      <View style={styles.headerContainer}>
        <View style={styles.nameContainer}>
          <HeaderText text="Basic Information" textStyle={styles.textStyle} />
        </View>
        <TitleText textStyle={styles.label} text={'Date of Birth'} />
        <View>
          <AppInput
            placeholder="DOB"
            onPressIn={() => {
              setShown(true);
            }}
            value={basicData?.dob ? format(new Date(basicData.dob), 'P') : ''}
          />
          <AppTouchableOpacity
            onPress={() => setShown(true)}
            style={{position: 'absolute', right: 10, top: 10}}>
            <AntDesign name="calendar" size={28} color={Colors.primary} />
          </AppTouchableOpacity>
          <ErrorMessage error={errors.dob?.message} />
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
      {locationInput.map((item, index: number) => (
        <View key={index.toString()}>
          {!item.select && (
            <View style={styles.inputContainer}>
              <MiddleModal
                onBlur={undefined}
                setIsModalVisible={setShown}
                isModalVisible={shown}
                handlePress={() => {}}>
                <DatePicker
                  date={basicData?.dob ? new Date(basicData.dob) : new Date()}
                  textColor="black"
                  mode="date"
                  onDateChange={d => {
                    setValue('dob', d);
                    setDate(new Date(d));
                    setError('dob', {type: 'custom', message: undefined});
                  }}
                />
                <Pressable onPress={() => setShown(false)}>
                  <TitleText text={'Close'} textStyle={styles.close} />
                </Pressable>
              </MiddleModal>
              {item.name === 'addressLine1' ? (
                <>
                  <GooglePredictLocation
                    label={item.title}
                    placeholder={item.placeholder}
                    name={'addressLine1'}
                    defaultValue={basicData.addressLine1}
                    onChange={value => {
                      setValue('addressLine1', value.split(',')[0]);
                      setError('addressLine1', {
                        type: 'custom',
                        message: undefined,
                      });
                      setValue('latitude', null);
                      setValue('longitude', null);
                    }}
                    onPlaceSelected={onPressAddress}
                    errors={errors}
                  />
                  <DescriptionText
                    textStyle={{paddingBottom: '2%'}}
                    text={
                      '*Please select your specific address for better owner reach.'
                    }
                  />
                </>
              ) : item.name === 'state' ? (
                <AppDropDownSelect
                  title={item.title}
                  setValue={setValue}
                  setError={setError}
                  name={item.name}
                  data={
                    basicData.countryId === '1' ? americanStates : canadaStates
                  }
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
                data={countries}
                control={control}
                defaultText={basicData.countryId}
                placeholder={'Please select a country'}
                country
              />
            </View>
          )}
        </View>
      ))}
      <View style={styles.inputContainer}>
        <View style={styles.footerContainer}>
          <SubmitButton title="Save" onPress={handleSubmit} loading={loading} />
        </View>
        <BottomSpacing />
      </View>
      <BottomSpacing />
    </ScrollView>
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
  close: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primaryDif,
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
});

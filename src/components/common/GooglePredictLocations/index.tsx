/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppInput from '../Form/AppInput';
import Text_Size from '../../../constants/textScaling';
import TitleText from '../text/TitleText';
import {debounce} from 'lodash';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppTouchableOpacity from '../AppClickEvents/AppTouchableOpacity';
import Colors from '../../../constants/Colors';
import ErrorMessage from '../Form/ErrorMessage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {baseUrlV} from '../../../utils/helpers/httpRequest';
import { CancelToken } from 'apisauce';

const usePlaceAutoComplete = () => {
  const [placeInputValue, setPlaceInputValue] = useState('');
  const [showPredictionDropDown, setShowPredictionDropDown] = useState(false);
  const [predictPlaces, setPredictPlaces] = useState([]);
  const [addressDetails, setAddressDetails] = useState(null);

  const onSelectPlaceId = (place: any) => {
    handleAddress(place?.description);
    setPlaceInputValue(place?.description);
    setShowPredictionDropDown(false);
  };

  const handleDebouncedSearch = useCallback(
    debounce(text => {
      handleSearch(text);
    }, 300),
    [],
  );

  const onChangePlaceInput = (e: any) => {
    setPlaceInputValue(e);
    handleDebouncedSearch(e);
  };

  const {request, loading: isLoading} = useApi(methods._get);
  const handleSearch = async (text: any) => {
    const locationEndPoint = `/predicted-locations?inputPlace=${text}`;
    const result = await request(locationEndPoint);
    if (result?.ok) {
      setPredictPlaces(result?.data?.data);
      setShowPredictionDropDown(true);
    }
  };

  const handleAddress = async (place: any) => {
    const locationAddressEndPoint = `${baseUrlV}/v2/location?address=${place}`;
    const result = await request(locationAddressEndPoint);
    if (result.ok) {
      setAddressDetails(result?.data?.results[0]);
    }
  };

  return {
    onChangePlaceInput,
    placeInputValue,
    setPlaceInputValue,
    predictedPlaces: predictPlaces,
    isLoading: isLoading,
    showPredictionDropDown,
    onSelectPlaceId,
    setShowPredictionDropDown,
    addressDetails,
    handleAddress,
  };
};

interface Props {
  name?: string;
  label?: string;
  placeholder?: string;
  editable?: boolean;
  defaultValue?: string;
  onPlaceSelected: any;
  onChange?: (text: any) => void;
  errors?: any;
}

const GooglePredictLocation = ({
  name,
  placeholder,
  label,
  editable = true,
  defaultValue,
  onChange,
  onPlaceSelected,
  errors,
}: Props) => {
  const {
    placeInputValue,
    onChangePlaceInput,
    predictedPlaces,
    isLoading,
    setPlaceInputValue,
    showPredictionDropDown,
    onSelectPlaceId,
    setShowPredictionDropDown,
    addressDetails,
  } = usePlaceAutoComplete();

  useEffect(() => {
    const source = CancelToken.source();
    if (addressDetails) {
      onPlaceSelected(addressDetails);
    }
    return () => {
      source.cancel();
    };
  }, [addressDetails]);

  useEffect(() => {
    const source = CancelToken.source();
    if (defaultValue) {
      setPlaceInputValue(defaultValue);
    } else {
      setPlaceInputValue(null);
    }
    return () => {
      source.cancel();
    };
  }, [defaultValue]);
  return (
    <View>
      {label && <TitleText textStyle={styles.label} text={label} />}

      <AppInput
        placeholder={placeholder}
        name={name}
        onChangeText={(e: any) => {
          onChangePlaceInput(e);
          onChange && onChange(e);
        }}
        editable={editable}
        value={placeInputValue}
        Icon={
          isLoading ? (
            <FontAwesome5Icon
              name="spinner"
              size={16}
              color={Colors.light.text}
            />
          ) : null
        }
      />
      {showPredictionDropDown &&
        predictedPlaces &&
        predictedPlaces.length > 0 && (
          <AppTouchableOpacity
            style={styles.overlay}
            onPress={() => setShowPredictionDropDown(false)}>
            <View style={styles.dropdown}>
              {predictedPlaces?.map((place: any) => (
                <AppTouchableOpacity
                  key={place.place_id}
                  onPress={() => {
                    onSelectPlaceId(place);
                    onChange && onChange(place.description);
                  }}>
                  <TitleText
                    text={place.description}
                    textStyle={styles.description}
                  />
                </AppTouchableOpacity>
              ))}
            </View>
          </AppTouchableOpacity>
        )}
      {errors && <ErrorMessage error={errors[name!]?.message} />}
    </View>
  );
};

export default GooglePredictLocation;

const styles = StyleSheet.create({
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  overlay: {
    width: '100%',
    maxHeight: '70%',
  },
  dropdown: {
    backgroundColor: Colors.light.background,
    width: '100%',
    shadowColor: Colors.darkShadow,
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  description: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
});

/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {InputFormData} from './utils/InputFormData';
import AppFormField from '../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../common/Form/SubmitButton';
import BottomSpacing from '../../UI/BottomSpacing';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import {CardForm} from '@stripe/stripe-react-native';
import TitleText from '../../common/text/TitleText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
// import ErrorMessage from '../../common/Form/ErrorMessage';
interface Props {
  handleValues: (values: any) => void;
  loading: boolean;
}

const CheckoutInputForm = ({handleValues, loading}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <View>
      {InputFormData.map((item, index) => {
        return (
          <View key={index}>
            {item.name === 'cardInfo' ? (
              <>
                <TitleText textStyle={styles.label} text={item.title} />
                <CardForm
                  onFormComplete={cardDetails => {
                    setValue(item.name, cardDetails, {
                      shouldValidate: errors[item.name] ? true : false,
                    });
                  }}
                  style={styles.cardField}
                  cardStyle={{
                    borderWidth: 1,
                    backgroundColor: colors.backgroundColor,
                    borderRadius: 2,
                    borderColor: isDarkMode ? Colors.gray : Colors.border,
                  }}
                />
                {/* <ErrorMessage error={errors?.cardInfo?.postalCode.message} /> */}
              </>
            ) : (
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                placeholder={item.placeholder}
                textContentType={'none'}
                name={item.name}
                label={item.title}
                // flex={item.flex}
                key={index}
                control={control}
                errors={errors}
              />
            )}
          </View>
        );
      })}
      <View style={styles.buttonWidth}>
        <SubmitButton
          title={'Add Card'}
          onPress={handleValues}
          loading={loading}
        />
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </View>
  );
};

export default CheckoutInputForm;

const styles = StyleSheet.create({
  textContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 6,
  },
  descriptionTextStyle: {
    color: Colors.primary,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  description: {
    lineHeight: 16,
    fontSize: Text_Size.Text_0,
    fontWeight: '400',
  },
  buttonWidth: {
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  cardField: {
    width: '100%',
    height: Platform.OS === 'ios' ? 200 : 300,
    marginBottom: 10,
  },
});

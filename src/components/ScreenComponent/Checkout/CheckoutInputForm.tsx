/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {InputFormData} from './utils/InputFormData';
import AppFormField from '../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../common/Form/SubmitButton';
import BottomSpacing from '../../UI/BottomSpacing';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import TitleText from '../../common/text/TitleText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {CardField} from '@stripe/stripe-react-native';
import DescriptionText from '../../common/text/DescriptionText';
import ErrorMessage from '../../common/Form/ErrorMessage';
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
  console.log(errors);
  return (
    <View style={styles.inputContainer}>
      <DescriptionText
        textStyle={styles.titleText}
        text={
          'Select your default methods for payment. we accepts all major credit and debit cards'
        }
      />
      <View style={styles.flatList}>
        {InputFormData.map((item, index) => {
          return (
            <View key={index} style={{width: item.flex ? '48%' : '100%'}}>
              {item.name === 'cardInfo' ? (
                <>
                  <TitleText textStyle={styles.label} text={item.title} />
                  <CardField
                    postalCodeEnabled={false}
                    onCardChange={cardDetails => {
                      setValue(item.name, cardDetails.last4, {
                        shouldValidate: errors?.cardInfo?.message
                          ? true
                          : false,
                      });
                      console.log('card', cardDetails);
                    }}
                    style={styles.cardField}
                    cardStyle={{
                      borderWidth: 1,
                      backgroundColor: colors.backgroundColor,
                      borderRadius: 3,
                      borderColor: isDarkMode ? Colors.gray : Colors.border,
                      fontSize: Text_Size.Text_0,
                    }}
                  />
                  <ErrorMessage error={errors?.cardInfo?.message} />
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
                  flex={item.flex}
                />
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.buttonWidth}>
        <SubmitButton
          title={'Add Card'}
          onPress={handleValues}
          loading={loading}
          color={'black'}
        />
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </View>
  );
};

export default CheckoutInputForm;

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
  },
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textContainer: {
    marginVertical:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
  titleText: {
    paddingVertical: 20,
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
    height: 50,
    fontSize: Text_Size.Text_10,
    marginBottom: 10,
  },
});

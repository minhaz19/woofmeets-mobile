/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {InputFormData} from '../utils/InputFormData';
import AppFormField from '../../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../../../common/Form/SubmitButton';
import BottomSpacing from '../../../../UI/BottomSpacing';
import Colors from '../../../../../constants/Colors';
import Text_Size from '../../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../../constants/WindowSize';
import TitleText from '../../../../common/text/TitleText';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';
import {CardField} from '@stripe/stripe-react-native';
import DescriptionText from '../../../../common/text/DescriptionText';
import ErrorMessage from '../../../../common/Form/ErrorMessage';
// import ErrorMessage from '../../common/Form/ErrorMessage';
interface Props {
  handleValues: (values: any) => void;
  loading: boolean;
  sequence: null | number;
}

const AddCardFormBody = ({handleValues, loading, sequence}: Props) => {
  const {isDarkMode, colors} = useTheme();
  const [cardStatus, setCardStatus] = useState<string | null>(null);
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();
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
                        shouldValidate: cardDetails.complete ? true : false,
                      });
                      !cardDetails.complete
                        ? cardDetails.validCVC === 'Invalid'
                          ? setCardStatus('CVC is invalid')
                          : cardDetails.validExpiryDate === 'Invalid'
                          ? setCardStatus('Expiry date is invalid')
                          : cardDetails.validNumber === 'Invalid'
                          ? setCardStatus('Card number is invalid')
                          : setCardStatus('Card field incomplete')
                        : setCardStatus(null);
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
                  <ErrorMessage
                    error={cardStatus || errors.cardInfo?.message}
                  />
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
                  key={index}
                  control={control}
                  errors={errors}
                />
              )}
            </View>
          );
        })}
      </View>
      <View
        style={[
          styles.noteContainer,
          {
            backgroundColor: isDarkMode
              ? Colors.light.tabIconDefault
              : Colors.secondary,
          },
        ]}>
        <DescriptionText
          textStyle={{
            textAlign: 'justify',
            fontWeight: 'bold',
            color: Colors.text,
          }}
          text="Note: We are going to use this card as a default card for future payments, you can add, delete multiple cards and make any card as your default card for payments anytime you want."
        />
      </View>
      <View style={styles.buttonWidth}>
        <SubmitButton
          title={
            sequence === 1
              ? 'Add Card'
              : sequence === 2 || sequence === 3
              ? 'Confirm Payment'
              : 'Add Card'
          }
          onPress={handleValues}
          loading={loading}
          // color={isDarkMode ? Colors.primary : Colors.background}
        />
      </View>
      <BottomSpacing />
      <BottomSpacing />
    </View>
  );
};

export default AddCardFormBody;

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
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '7%' : '2%',
  },
  cardField: {
    width: '100%',
    height: 50,
    fontSize: Text_Size.Text_10,
    marginBottom: 10,
  },
  noteContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: 5,
    marginTop: '6%',
  },
  leftContainer: {
    position: 'absolute',
    left: 10,
    top: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {paddingRight: 10},
});

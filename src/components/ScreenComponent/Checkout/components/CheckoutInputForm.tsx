import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {InputFormData} from '../utils/InputFormData';
import AppFormField from '../../../common/Form/AppFormField';
import {useFormContext} from 'react-hook-form';
import SubmitButton from '../../../common/Form/SubmitButton';
import BottomSpacing from '../../../UI/BottomSpacing';
import {PaymentSvg} from '../../Inbox/utils/SvgComponent/SvgComponent';
import DescriptionText from '../../../common/text/DescriptionText';
import Colors from '../../../../constants/Colors';
import Text_Size from '../../../../constants/textScaling';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
import {CardForm} from '@stripe/stripe-react-native';
import TitleText from '../../../common/text/TitleText';
import ErrorMessage from '../../../common/Form/ErrorMessage';
interface Props {
  handleValues: (values: any) => void;
}

const staticText = [
  {
    id: 1,
    description:
      "Clicking 'request to book' will put a temporary hold of $34.41 on your account. You will only be charged after Annette confirms the booking.",
    svg: <PaymentSvg />,
  },
  {
    id: 2,
    description:
      'Receive a full refund if you cancel by 12:00 p.m. the day before the booking begins. ',
    svg: <PaymentSvg />,
    link: true,
  },
  {
    id: 3,
    description:
      'All bookings are covered by the Rover Guarantee including 24/7 support and $25,000 in vet care. ',
    svg: <PaymentSvg />,
    link: true,
  },
];

const CheckoutInputForm = ({handleValues}: Props) => {
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();
  console.log('errors', errors);
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
                    console.log('card details', cardDetails);
                    setValue(item.name, cardDetails, {
                      shouldValidate: errors[item.name] ? true : false,
                    });
                  }}
                  style={{height: 200}}
                />
                <ErrorMessage error={errors?.cardInfo?.postalCode?.message} />
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
        <ButtonCom
          title={'Add Card'}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() => {}}
        />
      </View>
      <View style={styles.textContainer}>
        {staticText.map((text, index) => {
          return (
            <View key={index} style={styles.flexContainer}>
              {text.svg}
              <View style={styles.innerContainer}>
                <DescriptionText
                  text={text.description}
                  textStyle={styles.description}
                />
                {text.link && (
                  <TouchableOpacity onPress={() => {}}>
                    <DescriptionText
                      text={'Learn more'}
                      textStyle={styles.descriptionTextStyle}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <SubmitButton title="Request to Book" onPress={handleValues} />
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
    width: '30%',
    marginTop: SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '2%',
  },
});

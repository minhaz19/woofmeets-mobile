/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import React, {FC, memo} from 'react';
import Card from '../../../UI/Card';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ShortText from '../../../common/text/ShortText';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import changeTextLetter from '../../../common/changeTextLetter';
import {convertToLocalTZ} from '../../../common/formatDate';

interface Props {
  apntItem:
    | {
        id: number;
        serviceName: string;
        duration: string;
        orderStatus: string;
        ownerName: string;
        petName: string;
        ownerImage: string;
      }
    | any;
  buttonStyles?: string;
  handlePress?: () => void;
  onScreen?: () => void;
}
const BookingCard: FC<Props> = ({apntItem, onScreen}) => {
  const item = apntItem?.appointment;
  const {colors} = useTheme();
  const serviceTypeId = item?.providerService?.serviceTypeId;
  const proposalDate = item.appointmentProposal[0];
  const isRecurring = item.appointmentProposal[0]?.isRecurring;
  const dropOffStart = item?.appointmentProposal?.[0]?.dropOffStartTime;
  const dropOffEnd = item?.appointmentProposal?.[0]?.dropOffEndTime;
  const pickUpStart = item?.appointmentProposal?.[0]?.pickUpStartTime;
  const pickUpEnd = item?.appointmentProposal?.[0]?.pickUpEndTime;
  const vistWalkStart = apntItem?.visitStartTimeString;
  const visitWalkEnd = apntItem?.visitEndTimeString;
  const timezone = item.providerTimeZone;
  // const startDate = apntItem?.boardingType
  //   ? proposalDate.proposalStartDate
  //   : serviceTypeId === 4
  //   ? isRecurring
  //     ? proposalDate.recurringStartDate
  //     : proposalDate?.proposalOtherDate[0]?.date
  //   : apntItem.localDate;

  const startDate =
    serviceTypeId === 1 || serviceTypeId === 2
      ? proposalDate.proposalStartDate
      : serviceTypeId === 3 || serviceTypeId === 5
      ? isRecurring
        ? proposalDate.recurringStartDate
        : proposalDate.proposalVisits[0]?.date
      : serviceTypeId === 4
      ? isRecurring
        ? proposalDate.recurringStartDate
        : proposalDate?.proposalOtherDate[0]?.date
      : '';
  return (
    <TouchableOpacity onPress={onScreen}>
      <Card
        style={{
          ...styles.itemContainer,
          backgroundColor: colors.backgroundColor,
          flexDirection: 'row',
        }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            backgroundColor: Colors.primaryLight,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
            // flexWrap: 'wrap',
          }}>
          <TitleText
            text={convertToLocalTZ(startDate, timezone, 'DD')}
            textStyle={{
              fontSize: Text_Size.Text_3,
              fontWeight: 'bold',
              color: '#f83600',
              textAlign: 'center',
            }}
          />
          <TitleText
            text={convertToLocalTZ(startDate, timezone, 'MMM')}
            textStyle={{
              color: '#f83600',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <HeaderText
            text={changeTextLetter(
              `${item?.user?.firstName} ${item?.user?.lastName}`,
            )}
            textStyle={styles.textHeader}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#FAEFFE',
                borderRadius: 25,
                paddingHorizontal: 10,
              }}>
              <ShortText
                text={item?.providerService?.serviceType?.name}
                textStyle={{
                  marginVertical: 2,
                  fontWeight: '900',
                  color: '#B17CD5',
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 5,
                backgroundColor: '#E7FAF8',
                borderRadius: 25,
                paddingHorizontal: 10,
              }}>
              <ShortText
                text={changeTextLetter(item?.status.toLowerCase())}
                textStyle={{
                  color: '#57DCAB',
                  fontWeight: '900',
                }}
              />
            </View>
          </View>
          <ShortText
            text={
              item?.providerService
                ? serviceTypeId === 1 || serviceTypeId === 2
                  ? `🐶 Start Date:  ${convertToLocalTZ(
                      proposalDate.proposalStartDate,
                      timezone,
                      'DD ddd MMM YYYY',
                    )}`
                  : serviceTypeId === 3 || serviceTypeId === 5
                  ? isRecurring
                    ? `Start Date:  ${convertToLocalTZ(
                        proposalDate.recurringStartDate,
                        timezone,
                        'DD ddd MMM YYYY',
                      )}`
                    : `Start Date:  ${convertToLocalTZ(
                        proposalDate.proposalVisits[0]?.date,
                        timezone,
                        'DD ddd MMM YYYY',
                      )}`
                  : serviceTypeId === 4
                  ? isRecurring
                    ? `Start Date:  ${convertToLocalTZ(
                        proposalDate.recurringStartDate,
                        timezone,
                        'DD ddd MMM YYYY',
                      )}`
                    : `Start Date:  ${convertToLocalTZ(
                        proposalDate?.proposalOtherDate[0]?.date,
                        timezone,
                        'DD ddd MMM YYYY',
                      )}`
                  : ''
                : 'No Mesaegs fonnd'
            }
            textStyle={styles.textDescription}
          />
          {apntItem?.boardingType || serviceTypeId === 4 ? (
            <>
              <ShortText
                text={`⏰ Pick-Up Time: ${
                  pickUpStart?.replace('A', ' A')?.replace('P', ' P') +
                  ' to ' +
                  pickUpEnd?.replace('A', ' A')?.replace('P', ' P')
                }`}
                textStyle={styles.textDescription}
              />
              <ShortText
                text={`⏰ Drop-Off Time: ${
                  dropOffStart?.replace('A', ' A')?.replace('P', ' P') +
                  ' to ' +
                  dropOffEnd?.replace('A', ' A')?.replace('P', ' P')
                }`}
                textStyle={styles.textDescription}
              />
            </>
          ) : (
            <>
              <ShortText
                text={`⏰ ${
                  serviceTypeId === 5 ? 'Walk Start Time' : 'Visit Start Time'
                } ${vistWalkStart?.replace('A', ' A')?.replace('P', ' P')}`}
                textStyle={styles.textDescription}
              />
              <ShortText
                text={`⏰ ${
                  serviceTypeId === 5 ? 'Walk End Time' : 'Visit End Time'
                } ${visitWalkEnd?.replace('A', ' A')?.replace('P', ' P')}`}
                textStyle={styles.textDescription}
              />
            </>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default memo(BookingCard);

const styles = StyleSheet.create({
  itemContainer: {
    padding: '3%',
    borderRadius: 25,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    elevation: Platform.OS === 'android' ? 1 : 1,
  },

  textDescription: {
    lineHeight: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.02 : 20,
    fontSize: Text_Size.Text_8,
    marginVertical: 2,
    // width: '80%',
  },
  textHeader: {
    marginTop: 0,
  },
});

// <ShortText
//   text={
//     item?.providerService
//       ? serviceTypeId === 1 || serviceTypeId === 2
//         ? `🐶 Start Date:  ${format(
//             new Date(proposalDate.proposalStartDate),
//             'dd iii LLL yyyy',
//           )}`
//         : serviceTypeId === 3 || serviceTypeId === 5
//         ? `🐶 Start Date:  ${format(new Date(startDate), 'dd iii LLL yyyy')}`
//         : // ? isRecurring
//         //   ? `🐶 Start Date:  ${format(
//         //       new Date(proposalDate.recurringStartDate),
//         //       'dd iii LLL yyyy',
//         //     )}`
//         //   : `🐶 Start Date:  ${format(
//         //       new Date(proposalDate?.proposalVisits[0]?.date),
//         //       'dd iii LLL yyyy',
//         //     )}`
//         serviceTypeId === 4
//         ? isRecurring
//           ? `🐶 Start Date:  ${format(
//               new Date(proposalDate.recurringStartDate),
//               'dd iii LLL yyyy',
//             )}`
//           : `🐶 Start Date:  ${format(
//               new Date(proposalDate?.proposalOtherDate[0]?.date),
//               'dd iii LLL yyyy',
//             )}`
//         : ''
//       : 'No Mesaegs fonnd'
//   }
//   textStyle={styles.textDescription}
// />;

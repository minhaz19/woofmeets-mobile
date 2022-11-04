/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import BigText from '../../../common/text/BigText';
import TitleText from '../../../common/text/TitleText';
import ProviderProfileInfo from './ApntProviderProfileInfo';
import ProfileInfo from '../../profile/BasicInfo/ProfileInfo';
import {useAppSelector} from '../../../../store/store';
import {format} from 'date-fns';
import Colors from '../../../../constants/Colors';

const AppointmentProposalInfo = () => {
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);
  const {user} = useAppSelector(state => state.whoAmI);
  return (
    <View>
      <BigText text="Review and Payment" />
      <View style={styles.profileContainer}>
        {user?.id === proposedServiceInfo.userId ? (
          <ProviderProfileInfo />
        ) : user?.provider?.id === proposedServiceInfo.providerId ? (
          <ProfileInfo />
        ) : null}
      </View>
      <BigText
        text={`Stay Details for ${proposedServiceInfo.serviceName} Service`}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.border,
          padding: 10,
          borderRadius: 5,
          backgroundColor: Colors.iosBG,
          marginVertical: 20,
        }}>
        {proposedServiceInfo.serviceTypeId === 1 ||
        proposedServiceInfo.serviceTypeId === 2 ? (
          <>
            <TitleText
              text={'Service Time Range:'}
              textStyle={{fontWeight: 'bold', paddingVertical: 5}}
            />
            <TitleText
              text={`Proposal Start Time: ${proposedServiceInfo.proposalStartDate}`}
              textStyle={{paddingVertical: 2}}
            />
            <TitleText
              text={`Proposal End Time: ${proposedServiceInfo.proposalEndDate}`}
              textStyle={{paddingVertical: 2}}
            />
            <TitleText
              text={`Pick-Up Time: ${
                proposedServiceInfo.dropOffStartTime +
                ' - ' +
                proposedServiceInfo.dropOffEndTime
              } `}
              textStyle={{paddingVertical: 2}}
            />
            <TitleText
              text={`Pick-Up Time: ${
                proposedServiceInfo.pickUpStartTime +
                ' - ' +
                proposedServiceInfo.pickUpEndTime
              }`}
              textStyle={{paddingVertical: 2}}
            />
          </>
        ) : proposedServiceInfo?.serviceTypeId === 3 ||
          proposedServiceInfo?.serviceTypeId === 5 ? (
          proposedServiceInfo?.isRecurring ? (
            <>
              <TitleText
                text={'Recurring Service:'}
                textStyle={{fontWeight: 'bold', paddingVertical: 5}}
              />
              <TitleText
                text={`Starting from : ${format(
                  new Date(proposedServiceInfo.recurringStartDate),
                  'iii LLL d',
                )}`}
                textStyle={styles.textPadding}
              />
              <TitleText
                text={proposedServiceInfo?.recurringSelectedDay?.map(
                  (item: {date: string; visits: any}) => (
                    <TitleText
                      text={`Date: ${item.date} : Visit: ${item?.visits
                        .map((it: any) => it.time)
                        .join(', ')}`}
                      textStyle={{textAlign: 'justify'}}
                    />
                  ),
                )}
                textStyle={styles.textPadding}
              />
            </>
          ) : (
            <>
              <TitleText
                text={'One time service on:'}
                textStyle={{fontWeight: 'bold', paddingVertical: 5}}
              />
              <TitleText
                text={proposedServiceInfo?.proposalOtherDate?.map(
                  (item: {name: string; visits: any}) => (
                    <TitleText
                      text={`Date: ${item.name} : Visit: ${item?.visits
                        .map((it: any) => it.time)
                        .join(', ')}`}
                      textStyle={{textAlign: 'justify'}}
                    />
                  ),
                )}
                textStyle={styles.textPadding}
              />
            </>
          )
        ) : proposedServiceInfo?.serviceTypeId === 4 ? (
          proposedServiceInfo?.isRecurring ? (
            <>
              <TitleText
                text={'Recurring Service:'}
                textStyle={{fontWeight: 'bold', paddingVertical: 5}}
              />
              <TitleText
                text={`Starting from : ${format(
                  new Date(proposedServiceInfo.recurringStartDate),
                  'iii LLL d',
                )}`}
                textStyle={styles.textPadding}
              />
              <TitleText
                text={`Pick-Up Time: ${
                  proposedServiceInfo.dropOffStartTime +
                  ' - ' +
                  proposedServiceInfo.dropOffEndTime
                } `}
                textStyle={{paddingVertical: 4}}
              />
              <TitleText
                text={`Pick-Up Time: ${
                  proposedServiceInfo.pickUpStartTime +
                  ' - ' +
                  proposedServiceInfo.pickUpEndTime
                }`}
                textStyle={{paddingVertical: 4}}
              />
            </>
          ) : (
            <>
              <TitleText
                text={'One time service on:'}
                textStyle={{fontWeight: 'bold', paddingVertical: 5}}
              />
              <TitleText
                text={proposedServiceInfo.proposalOtherDate
                  .map((item: {date: string}) =>
                    format(new Date(item.date), 'yyyy-MM-dd'),
                  )
                  .join(', ')}
                textStyle={styles.textPadding}
              />
              <TitleText
                text={`Pick-Up Time: ${
                  proposedServiceInfo.dropOffStartTime +
                  ' - ' +
                  proposedServiceInfo.dropOffEndTime
                } `}
                textStyle={{paddingVertical: 4}}
              />
              <TitleText
                text={`Pick-Up Time: ${
                  proposedServiceInfo.pickUpStartTime +
                  ' - ' +
                  proposedServiceInfo.pickUpEndTime
                }`}
                textStyle={{paddingVertical: 4}}
              />
            </>
          )
        ) : null}
      </View>
    </View>
  );
};

export default AppointmentProposalInfo;

const styles = StyleSheet.create({
  boxContainer: {paddingHorizontal: '10%'},

  widthTextBox: {
    width: '80%',
  },
  textStyle: {
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
  },
  textPadding: {
    paddingVertical: 5,
  },
  profileContainer: {
    paddingVertical: 20,
  },
});

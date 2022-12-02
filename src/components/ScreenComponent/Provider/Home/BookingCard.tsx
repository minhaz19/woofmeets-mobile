import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import Card from '../../../UI/Card';
import HeaderText from '../../../common/text/HeaderText';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../constants/WindowSize';
import Colors from '../../../../constants/Colors';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import ShortText from '../../../common/text/ShortText';
import TitleText from '../../../common/text/TitleText';
import Text_Size from '../../../../constants/textScaling';
import changeTextLetter from '../../../common/changeTextLetter';
import {format} from 'date-fns';

interface Props {
  item:
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
  Icon: any;
  handlePress?: () => void;
  onScreen?: () => void;
}
const imageUrl =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const BookingCard: FC<Props> = ({
  item,
  buttonStyles,
  handlePress,
  onScreen,
  Icon,
}) => {
  const {colors} = useTheme();
  const serviceTypeId = item?.providerService?.serviceTypeId;
  const proposalDate = item.appointmentProposal[0];
  const isRecurring = item.appointmentProposal[0]?.isRecurring;
  return (
    <Card
      style={{
        ...styles.itemContainer,
        backgroundColor: colors.backgroundColor,
      }}>
      <TouchableOpacity onPress={onScreen}>
        <View style={styles.flexContainer}>
          <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <Icon width={30} height={30} />
              </View>
            </View>
            <View>
              <HeaderText
                text={item?.providerService?.serviceType?.name}
                textStyle={styles.textHeader}
              />
              <ShortText
                text={
                  item?.providerService
                    ? serviceTypeId === 1 || serviceTypeId === 2
                      ? `Starting From:  ${format(
                          new Date(proposalDate.proposalStartDate),
                          'iii LLL d',
                        )}`
                      : serviceTypeId === 3 || serviceTypeId === 5
                      ? isRecurring
                        ? `Starting From:  ${format(
                            new Date(proposalDate.recurringStartDate),
                            'iii LLL d',
                          )}`
                        : `Starting From:  ${format(
                            new Date(proposalDate?.proposalVisits[0]?.date),
                            'iii LLL d',
                          )}`
                      : serviceTypeId === 4
                      ? isRecurring
                        ? `Starting From:  ${format(
                            new Date(proposalDate.recurringStartDate),
                            'iii LLL d',
                          )}`
                        : `Starting From:  ${format(
                            new Date(proposalDate?.proposalOtherDate[0]?.date),
                            'iii LLL d',
                          )}`
                      : ''
                    : 'No Mesaegs fonnd'
                }
                textStyle={styles.textDescription}
              />
            </View>
          </View>
          <View style={styles.timeContainer}>
            <ShortText
              text={item?.status}
              textStyle={styles.textTimeDescription}
            />
          </View>
        </View>
        <View style={[styles.topContainer, {paddingTop: 10}]}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item?.user?.image ? item?.user?.image?.url : imageUrl,
              }}
              style={{...styles.image, borderColor: colors.borderColor}}
              resizeMode="contain"
            />
          </View>
          <View style={{width: '90%'}}>
            <TitleText
              text={changeTextLetter(
                `${item?.user?.firstName} ${item?.user?.lastName}`,
              )}
              textStyle={styles.textHeader}
            />
            <ShortText
              text={item?.appointmentProposal?.[0]?.appointmentPet
                ?.map(pet => String(pet.pet.name)?.slice(0, 30))
                .join(', ')}
              textStyle={styles.textDescription}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
    height: SCREEN_WIDTH <= 380 ? 30 : SCREEN_WIDTH <= 600 ? 30 : 40,
    marginRight: 10,
    // borderWidth: 1,
  },
  itemContainer: {
    padding: '3%',
    borderRadius: 4,
    marginBottom:
      SCREEN_WIDTH <= 380 ? '5%' : SCREEN_WIDTH <= 600 ? '4%' : '3%',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    elevation: Platform.OS === 'android' ? 1 : 1,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  imageContainer: {
    marginRight: 10,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  timeContainer: {
    alignItems: 'center',
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    width: '100%',
  },
  textDescription: {
    lineHeight: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.02 : 20,
    fontSize: Text_Size.Text_8,
    // width: '80%',
  },
  textHeader: {
    marginTop: 0,
  },
  textTimeDescription: {
    color: Colors.success,
  },
});

/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Platform, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import PhotoGalleryList from '../../../components/common/ImagePicker/PhotoGalleryList';
import HeaderText from '../../../components/common/text/HeaderText';
import ReportPet from './ReportPet';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import {
  setIsFoodSelected,
  setIsPeeSelected,
  setIsPooSelected,
  setIsWaterSelected,
  setPhoto,
} from '../../../store/slices/reportCard/reportCardSlice';
import Colors from '../../../constants/Colors';
import AppInput from '../../../components/common/Form/AppInput';
import Text_Size from '../../../constants/textScaling';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import {StackActions} from '@react-navigation/native';
import TitleText from '../../../components/common/text/TitleText';
import {formatDate} from '../../../components/common/formatDate';
interface Props {
  route: any;
  navigation: any;
}
const GenerateReport = ({navigation, route}: Props) => {
  // const walkTime = route?.params?.walkTime;
  // const distance = route?.params?.distance;
  const appointmentDateId = route?.params?.appointmentDateId;
  const reportInfo = route?.params?.reportInfo;

  const [isMedication, setIsMedication] = useState('');
  const [isAdditionalNotes, setIsAdditionalNotes] = useState('');

  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {isPeeSelected, isPooSelected, isWaterSelected, isFoodSelected, photo} =
    useAppSelector((state: any) => state?.reportCard);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  // methods for api call
  const {request: uploadRequest, loading: uploadLoading} = useApi(
    methods._post,
  );
  const {request: reportRequest, loading: reportLoading} = useApi(
    methods._post,
  );
  const {request: reportEmptyRequest, loading: reportEmptyLoading} = useApi(
    methods._post,
  );
  //Remove photo
  // const {request: deleteRequest, loading: deleteLoading} = useApi(
  //   methods._delete,
  // );
  const handleRemove = async (uri: string) => {
    // const removeEndPoint = `/gallery/photo/delete/${uri}`;
    // const result = await deleteRequest(removeEndPoint);
    dispatch(setPhoto(photo?.filter((image: any) => image !== uri)));
  };

  //Upload photo
  // const {request: uploadRequest, loading: uploadLoading} = useApi(
  //   methods._post,
  // )

  const handleAdd = async (_e: any) => {
    const formData = new FormData();
    formData.append('files', {
      name: 'image' + Math.random(),
      type: 'image/jpeg',
      uri: _e,
    });
    const uploadEndPoint = `/appointment/card/upload-file/${
      proposedServiceInfo?.appointmentOpk
    }/${
      proposedServiceInfo?.serviceTypeId === 5
        ? appointmentDateId !== null && appointmentDateId !== undefined
          ? appointmentDateId
          : reportInfo.id
        : reportInfo.id
    }`;
    const result = await uploadRequest(uploadEndPoint, formData);
    try {
      dispatch(setPhoto([...photo, result?.data[0]?.url]));
    } catch (err) {}
  };
  useEffect(() => {
    dispatch(setIsPeeSelected(proposedServiceInfo?.petsInfo));
    dispatch(setIsPooSelected(proposedServiceInfo?.petsInfo));
    dispatch(setIsFoodSelected(proposedServiceInfo?.petsInfo));
    dispatch(setIsWaterSelected(proposedServiceInfo?.petsInfo));
  }, [dispatch, proposedServiceInfo?.petsInfo]);

  // upload appointment card
  const handleReportCard = async () => {
    let petsArray: any = [];
    proposedServiceInfo?.petsInfo?.map((item: any) => {
      let petsObj = {};
      isPeeSelected?.map((i: any) => {
        if (item.id === i.id) {
          Object.assign(petsObj, {
            petId: i.petId,
            pee: i.pee,
            petName: i.pet?.name,
            petImage: i.pet?.profile_image?.url,
          });
        }
      });
      isPooSelected?.map((i: any) => {
        if (item.id === i.id) {
          Object.assign(petsObj, {poo: i.poo});
        }
      });
      isFoodSelected?.map((i: any) => {
        if (item.id === i.id) {
          Object.assign(petsObj, {food: i.food});
        }
      });
      isWaterSelected?.map((i: any) => {
        if (item.id === i.id) {
          Object.assign(petsObj, {water: i.water});
        }
      });
      petsArray.push(petsObj);
    });

    const endPoint = '/appointment/card/create';

    Alert.alert('Send Report', 'Are you sure you want to send report info', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: async () => {
          const formattedData =
            proposedServiceInfo.serviceTypeId === 5
              ? {
                  appointmentId: proposedServiceInfo?.billing[0]?.appointmentId,
                  appointmentDateId:
                    appointmentDateId !== null &&
                    appointmentDateId !== undefined
                      ? appointmentDateId
                      : reportInfo.id,
                  images: photo,
                  petsData: petsArray,
                  medication: isMedication,
                  additionalNotes: isAdditionalNotes,
                  // totalWalkTime: walkTime,
                  // distance: distance,
                  distanceUnit: 'Miles',
                  // generateTime: new Date(reportStartTime).toISOString(),
                  submitTime: new Date().toISOString(),
                }
              : {
                  appointmentId: reportInfo?.appointmentId,
                  appointmentDateId: reportInfo?.id,
                  images: photo,
                  petsData: petsArray,
                  medication: isMedication,
                  // generateTime: reportInfo?.startTime,
                  submitTime: new Date().toISOString(),
                  additionalNotes: isAdditionalNotes,
                };
          const result = await reportRequest(endPoint, formattedData);
          if (result?.ok) {
            navigation.dispatch(
              StackActions.replace('ActivityScreen', {
                appointmentOpk: proposedServiceInfo?.appointmentOpk,
                screen: 'Inbox',
              }),
            );
          }
        },
      },
    ]);
  };

  // send empty report card
  const handleEmptyReportCard = async () => {
    const endPoint = '/appointment/card/create';
    Alert.alert(
      'Send Empty Report',
      'Are you sure you want to send empty report',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: async () => {
            const formattedData =
              proposedServiceInfo.serviceTypeId === 5
                ? {
                    appointmentId:
                      proposedServiceInfo?.billing[0]?.appointmentId,
                    appointmentDateId:
                      appointmentDateId !== null &&
                      appointmentDateId !== undefined
                        ? appointmentDateId
                        : reportInfo.id,
                    submitTime: new Date().toISOString(),
                  }
                : {
                    appointmentId: reportInfo?.appointmentId,
                    appointmentDateId: reportInfo?.id,
                    submitTime: new Date().toISOString(),
                  };
            const result = await reportEmptyRequest(endPoint, formattedData);
            if (result?.ok) {
              navigation.dispatch(
                StackActions.replace('ActivityScreen', {
                  appointmentOpk: proposedServiceInfo?.appointmentOpk,
                  screen: 'Inbox',
                }),
              );
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: Colors.iosBG}]}>
        <View>
          <HeaderText
            text={
              'Generate Report for: ' +
              formatDate(reportInfo?.localDate, 'LLL d yyyy') +
              ' ' +
              reportInfo?.visitStartTimeString
            }
            textStyle={{paddingVertical: 10, marginHorizontal: 15}}
          />
          <HeaderText
            text="Activities"
            textStyle={{paddingVertical: 10, marginHorizontal: 15}}
          />
          {proposedServiceInfo?.petsInfo?.map(
            (item: {id: number; pet: any; profile_image: {url: any}}) => (
              <ReportPet
                key={item?.id}
                id={item?.id}
                title={item?.pet?.name}
                rowImage
                image={item?.pet?.profile_image?.url}
                isPeeSelected={isPeeSelected}
                isPooSelected={isPooSelected}
                isFoodSelected={isFoodSelected}
                isWaterSelected={isWaterSelected}
              />
            ),
          )}
        </View>
        <View
          style={{
            backgroundColor: colors.backgroundColor,
            padding: 15,
            marginVertical: 10,
          }}>
          <HeaderText textStyle={styles.label} text={'Medication'} />
          <AppInput
            placeholder={'Write something'}
            onChangeText={(text: string) => {
              setIsMedication(text);
            }}
            numberOfLines={12}
          />
          <HeaderText textStyle={styles.label} text={'Additional Notes'} />
          <AppInput
            placeholder={'Write something'}
            onChangeText={(text: string) => {
              setIsAdditionalNotes(text);
            }}
            numberOfLines={12}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.backgroundColor,
            paddingHorizontal: 15,
            marginVertical: 10,
          }}>
          {uploadLoading ? (
            <View style={{marginVertical: '15%'}}>
              <TitleText
                text="Loading..."
                textStyle={{
                  fontSize: Text_Size.Text_1,
                  fontWeight: 'bold',
                  color: Colors.primary,
                  textAlign: 'center',
                  // marginTop: '50%',
                  // height: '100%',
                }}
              />
            </View>
          ) : (
            <PhotoGalleryList
              label={'Photos'}
              imageUris={photo}
              onRemoveImage={handleRemove}
              onAddImage={handleAdd}
              handlePress={() => {}}
              marginTop={false}
              deleteShow={false}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: '5%',
          }}>
          <ButtonCom
            title={'Send Empty Report'}
            loading={reportEmptyLoading}
            textAlignment={btnStyles.textAlignment}
            containerStyle={{
              ...btnStyles.containerStyleFullWidth,
              borderRadius: 8,
              marginRight: 10,
              width: Platform.OS === 'android' ? '40%' : '48%',
            }}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => handleEmptyReportCard()}
          />
          <ButtonCom
            title={'Proceed'}
            loading={reportLoading}
            textAlignment={btnStyles.textAlignment}
            containerStyle={{
              ...btnStyles.containerStyleFullWidth,
              borderRadius: 8,
              width: Platform.OS === 'android' ? '40%' : '48%',
            }}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => handleReportCard()}
          />
        </View>
        <BottomSpacing />
      </ScrollView>
    </>
  );
};

export default GenerateReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    borderRadius: 6,
  },
  slotContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 10,
  },
  slot: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.border,
    borderRadius: 10,
  },
  done: {fontWeight: 'bold', fontSize: Text_Size.Text_1},
  label: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    marginBottom: 10,
  },
});

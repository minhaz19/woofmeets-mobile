/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
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
// import AppTouchableOpacity from '../../../components/common/AppClickEvents/AppTouchableOpacity';
// import TitleText from '../../../components/common/text/TitleText';
// import {ClockSvg} from '../../../assets/svgs/SVG_LOGOS';
// import ReportTimePicker from './ReportTimePicker';
import AppInput from '../../../components/common/Form/AppInput';
import Text_Size from '../../../constants/textScaling';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import AppActivityIndicator from '../../../components/common/Loaders/AppActivityIndicator';
import CalendarInput from '../../../components/ScreenComponent/Service/FilterProvider/CalendarInput';
import DateRange from '../../../components/common/DateRange';

const GenerateReport = () => {
  const [reportStartTime, setReportStartTime] = useState<any>(null);
  // const [reportEndTime, setReportEndTime] = useState<string>('');
  // const [startDateVisible, setStartDateVisible] = useState(false);
  const [isMedication, setIsMedication] = useState('');
  const [isAdditionalNotes, setIsAdditionalNotes] = useState('');
  const [OpenDropIn, setOpenDropIn] = useState(false);

  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {isPeeSelected, isPooSelected, isWaterSelected, isFoodSelected, photo} =
    useAppSelector((state: any) => state?.reportCard);
  const {proposedServiceInfo} = useAppSelector(state => state.proposal);

  const handleDropIn = () => {
    setOpenDropIn(!OpenDropIn);
    // setOpenDropOut(false);
  };

  // methods for api call
  const {request: uploadRequest, loading: uploadLoading} = useApi(
    methods._post,
  );
  const {request: reportRequest, loading: reportLoading} = useApi(
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
  // );
  const handleAdd = async (_e: any) => {
    const formData = new FormData();
    formData.append('files', {
      name: 'image' + Math.random(),
      type: 'image/jpeg',
      uri: _e,
    });
    const uploadEndPoint = `/appointment/card/upload-file/${
      proposedServiceInfo?.appointmentOpk
    }/${276}`;
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
      isPeeSelected?.map(i => {
        if (item.id === i.id) {
          Object.assign(petsObj, {
            petId: i.petId,
            pee: i.pee,
            petName: i.pet?.name,
            petImage: i.pet?.profile_image?.url,
          });
        }
      });
      isPooSelected?.map(i => {
        if (item.id === i.id) {
          Object.assign(petsObj, {poo: i.poo});
        }
      });
      isFoodSelected?.map(i => {
        if (item.id === i.id) {
          Object.assign(petsObj, {food: i.food});
        }
      });
      isWaterSelected?.map(i => {
        if (item.id === i.id) {
          Object.assign(petsObj, {water: i.water});
        }
      });
      petsArray.push(petsObj);
    });

    const endPoint = '/appointment/card/create';
    const formattedData = {
      appointmentId: proposedServiceInfo?.billing[0]?.appointmentId,
      appointmentDateId: 276,
      images: photo,
      petsData: petsArray,
      medication: isMedication,
      additionalNotes: isAdditionalNotes,
      // totalWalkTime: 'string',
      // distance: 0,
      // distanceUnit: 'string',
      generateTime: new Date(reportStartTime).toISOString(),
      submitTime: new Date().toISOString(),
    };
    const result = await reportRequest(endPoint, formattedData);
    if (result?.ok) {
      Alert.alert();
    }
  };
  return (
    <>
      {uploadLoading && <AppActivityIndicator visible={true} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {backgroundColor: Colors.iosBG}]}>
        <View
          style={[
            styles.slotContainer,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          {/* <AppTouchableOpacity
            style={[
              styles.slot,
              {
                backgroundColor: Colors.border,
              },
            ]}
            onPress={() => setStartDateVisible(!startDateVisible)}>
            <View>
              <HeaderText textStyle={styles.done} text={'Start and End Time'} />
              <TitleText
                textStyle={{fontSize: Text_Size.Text_12}}
                text={
                  reportStartTime !== ''
                    ? 'Start:' + reportStartTime
                    : 'Tap to start'
                }
              />
              {reportEndTime !== '' && (
                <TitleText
                  textStyle={{fontSize: Text_Size.Text_12}}
                  text={'End:' + reportEndTime}
                />
              )}
            </View>
            <View style={styles.iconContainer}>
              <ClockSvg fill="black" />
            </View>
          </AppTouchableOpacity>
          <ReportTimePicker
            visible={startDateVisible}
            setVisible={setStartDateVisible}
            title={'Start and End time slot ⏰'}
            startName={'reportStartTime'}
            endName={'reportEndTime'}
            reportStartTime={reportStartTime}
            reportEndTime={reportEndTime}
            setReportStartTime={setReportStartTime}
            setReportEndTime={setReportEndTime}
          /> */}
          <HeaderText text="Start Date" textStyle={styles.label} />
          <View style={{width: '48%'}}>
            <CalendarInput
              placeholder={'Start date'}
              value={reportStartTime}
              setOpenCal={handleDropIn}
            />
          </View>
          {OpenDropIn && (
            <DateRange
              value={null}
              setOpenCal={handleDropIn}
              setTime={setReportStartTime}
            />
          )}
        </View>
        <View>
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
                image={item?.pet?.profile_image.url}
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
          <PhotoGalleryList
            label={'Photos'}
            imageUris={photo}
            onRemoveImage={handleRemove}
            onAddImage={handleAdd}
            handlePress={() => {}}
            marginTop={false}
          />
        </View>
        <View style={{marginHorizontal: '5%'}}>
          <ButtonCom
            title={'Send Report Card'}
            loading={reportLoading}
            textAlignment={btnStyles.textAlignment}
            containerStyle={{
              ...btnStyles.containerStyleFullWidth,
              borderRadius: 8,
            }}
            titleStyle={btnStyles.titleStyle}
            onSelect={() => handleReportCard()}
          />
          <BottomSpacing />
        </View>
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

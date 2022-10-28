/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import BottomSpacing from '../../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../../components/common/ScreenRapperGrey';
import InputItem from '../../../components/ScreenComponent/reports/Cards/InputItem';
import StaticMap from '../map/NavigateMap';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import getLiveLocation from '../map/helperFunction/useGetLiveLocation';
import MiddleModal from '../../../components/UI/modal/MiddleModal';
import SwitchView from '../../../components/common/switch/SwitchView';
import HeaderText from '../../../components/common/text/HeaderText';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import Text_Size from '../../../constants/textScaling';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import TitleText from '../../../components/common/text/TitleText';
import BigText from '../../../components/common/text/BigText';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import {setIsSelectedPet} from '../../../store/slices/reportCard/reportCardSlice';

const ReportCardInitial = () => {
  const [items] = useState([
    {
      id: 1,
      sequence: 1,
      name: 'Pee',
      title: 'Who Peed',
      icon: (
        <MaterialIcons
          name="waterfall-chart"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
    },
    {
      id: 2,
      sequence: 2,
      name: 'Poo',
      title: 'Who Poop',
      icon: (
        <MaterialCommunityIcons
          name="emoticon-poop"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
    },
    {
      id: 3,
      sequence: 3,
      name: 'Food',
      title: 'Who Eats Food',
      icon: (
        <MaterialCommunityIcons
          name="pot-mix-outline"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
    },
    {
      id: 4,
      sequence: 4,
      name: 'Water',
      title: 'Who Drink Water',
      icon: (
        <Entypo
          name="water"
          size={SCREEN_WIDTH <= 380 ? 24 : SCREEN_WIDTH <= 600 ? 30 : 32}
          color={Colors.primary}
        />
      ),
    },
  ]);
  const [sequence, setSequence] = useState<number>(0);
  const currentUserLocation = useAppSelector(
    state => state.address.currentUserLocation,
  );
  useEffect(() => {}, [currentUserLocation]);
  const dispatch = useAppDispatch();
  const {pets, loading: petsLoading} = useAppSelector(
    (state: any) => state?.allPets,
  );
  const {isSelectedPet} = useAppSelector((state: any) => state?.reportCard);
  const onPressService = (data: any) => {
    setSequence(data?.id);
    setIsModalVisible(true);
  };
  getLiveLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendEmailInNewMessage, setIsSendEmailInNewMessage] = useState(true);
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MiddleModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onBlur={undefined}
          isButton
          notOutsidePress
          height={'40%'}>
          <View style={{flex: 1, width: '100%'}}>
            <HeaderText
              text={sequence !== 0 && items[sequence - 1].title}
              textStyle={{textAlign: 'center', width: '100%', paddingTop: 20}}
            />
            <ScrollView showsHorizontalScrollIndicator={false}>
              {pets?.map(
                (item: {
                  id: number;
                  name: string;
                  profile_image: {url: any};
                }) => {
                  return (
                    <View
                      key={item?.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        width: '100%',
                        paddingHorizontal: '5%',
                      }}>
                      <View style={{paddingRight: 10}}>
                        <ImageAndTitle
                          title={item.name}
                          rowImage
                          image={
                            item.profile_image
                              ? item.profile_image.url
                              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                          }
                        />
                      </View>
                      <SwitchView
                        isActive={isSelectedPet === item.id ? true : false}
                        activeText=""
                        inActiveText=""
                        onSelect={() => {
                          dispatch(setIsSelectedPet(item?.id));
                        }}
                      />
                    </View>
                  );
                },
              )}
            </ScrollView>
          </View>
        </MiddleModal>
        <View style={styles.tabContainer}>
          {items.map(item => (
            <InputItem
              key={item.id}
              data={item}
              noShadow
              onPressEvent={onPressService}
              sequence={sequence}
            />
          ))}
        </View>
        <View style={{height: 200}}>
          <StaticMap />
        </View>
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <HeaderText text="Your Pets" textStyle={{paddingBottom: 10}} />
          {pets?.map(
            (item: {id: number; name: string; profile_image: {url: any}}) => (
              <ImageAndTitle
                key={item.id}
                id={item.id}
                title={item.name}
                rowImage
                image={item.profile_image.url}
              />
            ),
          )}
          <View
            style={{
              paddingTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <TitleText text="Dog Walk Time" />
              <BigText
                text="00:00:40"
                textStyle={{fontSize: Text_Size.Text_1}}
              />
            </View>
            <View>
              <TitleText text="Distance" />
              <BigText
                text="00:00:40"
                textStyle={{fontSize: Text_Size.Text_1}}
              />
            </View>
            <View style={{maxWidth: 240}}>
              <ButtonCom
                title={'Stop'}
                textAlignment={btnStyles.textAlignment}
                containerStyle={{
                  ...btnStyles.containerStyleFullWidth,
                  borderRadius: 8,
                }}
                titleStyle={btnStyles.titleStyle}
                onSelect={() => {}}
              />
            </View>
          </View>
        </View>

        <BottomSpacing />
      </ScrollView>
    </ScreenRapperGrey>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  containerStyle: {
    height: SCREEN_HEIGHT <= 800 ? SCREEN_HEIGHT * 0.05 : 50,
    width: '40%',
    marginTop: '1%',
    borderRadius: 4,
  },
  textAlignment: {
    color: Colors.light.background,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Text_Size.Text_8,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: Text_Size.Text_8,
  },
});
export default ReportCardInitial;

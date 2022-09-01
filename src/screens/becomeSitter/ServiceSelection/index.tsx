import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import HeaderText from '../../../components/common/text/HeaderText';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ReusableServices from '../../../components/ScreenComponent/becomeSitter/serviceSelection/ReusableServices';
import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../assets/svgs/Services_SVG';
import ButtonCom from '../../../components/UI/ButtonCom';
import {btnStyles} from '../../../constants/theme/common/buttonStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getServiceTypes } from '../../../store/slices/profile/services';

interface Props {
  item: any;
}

const ServiceSelection = (props: { navigation: { navigate: (arg0: string, arg1: { serviceData: { id: number; name: string; image: JSX.Element; description: string; price: string; clicked: boolean; }[]; }) => void; }; }) => {
  const {colors} = useTheme();
  const [sequence, setSequence] = useState<number>(0);
  const serviceTypes = useAppSelector(
    state => state.services.serviceTypes,
  );
  const [selectData, setSelectData] = useState([
    {
      id: 1,
      sequence: 1,
      name: 'Boarding',
      image: <BoardingIcon width={34} height={36} />,
      description: 'Overnight pet care in your clients home',
      price: 'Avg. $25.60 / night',
    },
    {
      id: 2,
      sequence: 2,
      name: 'House Sitting',
      image: <HouseSittingIcon width={34} height={36} />,
      description: 'Overnight pet care in your clients home',
      price: 'Avg. $25.60 / night',
    },
    {
      id: 3,
      sequence: 3,
      name: 'Drop-in Visits',
      image: <DropInVisitIcon width={34} height={36} />,
      description: 'Potty breaks and play dates',
      price: 'Avg. $25.60 / night',
    },
    {
      id: 4,
      sequence: 4,
      name: 'Doggy Day Care',
      image: <DoggyDayCareIcon width={34} height={36} />,
      description: 'Daytime pet care in your home',
      price: 'Avg. $25.60 / night',
    },
    {
      id: 5,
      sequence: 5,
      name: 'Dog Waking',
      image: <DogWalkingIcon width={34} height={36} />,
      description: 'Dog walks that fit your schedule',
      price: 'Avg. $25.60 / night',
    },
  ]);

  console.log('types ', serviceTypes);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getServiceTypes());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onPressEvent = (id: number) => {
    setSequence(id);
    // selectData[id].clicked = !selectData[id].clicked;
    // setSelectData([...selectData]);
  };
  const RenderItem: FC<Props> = ({item}) => (
    <ReusableServices data={item} noShadow onPressEvent={onPressEvent} sequence={sequence} />
  );
  const renderHeader = () => {
    return (
      <View style={styles.innerViewContainer}>
        <HeaderText text="Service Selection" />
        <View style={styles.viewQuestionStyle}>
          <MaterialIcons
            name="error"
            size={14}
            color={Colors.primary}
          />
          <ShortText
            textStyle={{...styles.shortText, color: Colors.primary}}
            text="Which services should I choose?"
          />
        </View>
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="1. Select at least one service you’re interested in. You can always add more later."
        />
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="2. If you select more than one service, you will only see one of them during the sign up process."
        />
        <DescriptionText
          textStyle={styles.descriptionStyle}
          text="3. After your profile is submitted for review, you can edit your selected services or add more."
        />
      </View>
    )
  }
  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <ButtonCom
          title="Save and Continue"
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={() =>
            props.navigation.navigate('HomeProfile', {serviceData: serviceTypes, sequence: sequence})
          }
        />
      </View>
    )
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}>
      {serviceTypes && (
         <FlatList
          columnWrapperStyle={styles.flatList}
          data={serviceTypes}
          numColumns={2}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    padding: '5%',
  },
  descriptionStyle: {
    paddingVertical: '2%',
  },
  shortText: {
    paddingLeft: 5,
  },
  viewQuestionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerContainer: {
    paddingHorizontal: '10%',
    paddingBottom: 100,
  },
  flatList: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});

export default ServiceSelection;

import { ScrollView, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import HeaderText from '../../../components/common/text/HeaderText';
import { useTheme } from '../../../constants/theme/hooks/useTheme';
import DescriptionText from '../../../components/common/text/DescriptionText';
import ShortText from '../../../components/common/text/ShortText';
import Colors from '../../../constants/Colors';
import ReusableServices from '../../../components/ScreenComponent/becomeSitter/serviceSelection/ReusableServices';
import { BoardingIcon, DoggyDayCareIcon, DogWalkingIcon, DropInVisitIcon, HouseSittingIcon } from '../../../assets/svgs/Services_SVG';
import ButtonCom from '../../../components/UI/ButtonCom';
import { btnStyles } from '../../../constants/theme/common/buttonStyles';

interface Props {
  item: any;
}

const ServiceSelection = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
    const {colors} = useTheme();
    const [selectData, setSelectData] = useState([
      {
        id: 1,
        name: 'Boarding',
        image: <BoardingIcon width={34} height={36} />,
        description:
          'Overnight pet care in your clients home',
        price: 'Avg. $25.60 / night',
        clicked: false,
      },
      {
        id: 2,
        name: 'Dog Waking',
        image: <DogWalkingIcon width={34} height={36} />,
        description: 'Dog walks that fit your schedule',
        price: 'Avg. $25.60 / night',
        clicked: false,
      },
      {
        id: 3,
        name: 'Doggy Day Care',
        image: <DoggyDayCareIcon width={34} height={36} />,
        description: 'Daytime pet care in your home',
        price: 'Avg. $25.60 / night',
        clicked: false,
      },
      {
        id: 4,
        name: 'Drop-in Visits',
        image: <DropInVisitIcon width={34} height={36} />,
        description: 'Potty breaks and play dates',
        price: 'Avg. $25.60 / night',
        clicked: false,
      },
      {
        id: 5,
        name: 'House Sitting',
        image: <HouseSittingIcon  width={34} height={36} />,
        description: 'Overnight pet care in your clients home',
        price: 'Avg. $25.60 / night',
        clicked: true,
      },
    ]);
    const onPressEvent = (id: number) => {
      console.log('printing id', id);
      selectData[id].clicked = !selectData[id].clicked;
      setSelectData([...selectData]);
    };
    const RenderItem: FC<Props> = ({item}) => (
      <ReusableServices data={item} noShadow onPressEvent={onPressEvent} />
    );
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
          },
        ]}>
      <View style={styles.innerViewContainer}>
      <HeaderText text="Service Selection" />
      <DescriptionText textStyle={styles.descriptionStyle} text="1- Select at least one service you’re interested in. You can always add more later." />
      <DescriptionText textStyle={styles.descriptionStyle} text="2- If you select more than one service, you will only see one of them during the sign up process." />
      <DescriptionText textStyle={styles.descriptionStyle} text="3- After your profile is submitted for review, you can edit your selected services or add more." />
      <View style={styles.viewQuestionStyle}>
        <ShortText textStyle={{...styles.shortText, color: Colors.light.blue}} text="Which services should I choose?" />
      </View>
      <View>
          {selectData.map(item => {
            return <RenderItem key={item.id} item={item} />;
          })}
        </View>
      </View>
      <View style={styles.footerContainer}>
      <ButtonCom
        title="Save and Continue"
        textAlignment={btnStyles.textAlignment}
        containerStyle={btnStyles.containerStyleFullWidth}
        titleStyle={btnStyles.titleStyle}
        onSelect={() => props.navigation.navigate('HomeProfile', {serviceData: selectData})}
      />
      </View>
    </ScrollView>
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
      shortText: {},
      viewQuestionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      footerContainer: {
        paddingHorizontal: '10%',
        paddingBottom: 100,
      },
});

export default ServiceSelection;

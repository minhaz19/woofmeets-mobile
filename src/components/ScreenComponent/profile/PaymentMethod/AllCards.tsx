/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ListItem from './components/ListItem';
import {
  Amazon,
  AmericanExpress,
  DinnersClubs,
  Discover,
  JCB,
  MasterCard,
  UnionPay,
  Visa,
} from '../../../../assets/svgs/Cards';
import {Plus} from '../../../../assets/svgs/SVG_LOGOS';
import HeaderText from '../../../common/text/HeaderText';
import Text_Size from '../../../../constants/textScaling';
import {useTheme} from '../../../../constants/theme/hooks/useTheme';
import Colors from '../../../../constants/Colors';
import {SCREEN_WIDTH} from '../../../../constants/WindowSize';
import DescriptionText from '../../../common/text/DescriptionText';
import ButtonCom from '../../../UI/ButtonCom';
import {btnStyles} from '../../../../constants/theme/common/buttonStyles';
interface Props {
  cards: any;
  CardId: null | number;
  onPress?: () => void;
  sequence: number | null;
  loading: boolean;
}
const AllCards = ({cards, CardId, onPress, sequence, loading}: Props) => {
  const newCard = [...cards];
  const i = cards.findIndex((item: {id: number}) => item.id === CardId);
  newCard.splice(0, 0, newCard.splice(i, 1)[0]);
  newCard.push({addCard: true, brand: 'new'});

  const {colors} = useTheme();
  const [active, setActive] = useState(true);
  const [cardIndex, setActiveCardIndex] = useState<null | number>(null);

  const getIcon = (brand: string) => {
    switch (brand) {
      case 'Visa':
        return <Visa width={50} height={50} />;
      case 'MasterCard':
        return <MasterCard width={50} height={50} />;
      case 'American Express':
        return <AmericanExpress width={50} height={50} />;
      case 'UnionPay':
        return <UnionPay width={50} height={50} />;
      case 'Diners Club':
        return <DinnersClubs width={50} height={50} />;
      case 'JCB':
        return <JCB width={50} height={50} />;
      case 'Discover':
        return <Discover width={50} height={50} />;
      case 'Amazon':
        return <Amazon width={50} height={50} />;
      case 'new':
        return <Plus fill="gray" width={25} height={25} />;
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        showsVerticalScrollIndicator={false}>
        <View>
          <HeaderText textStyle={styles.title} text="Your cards" />
          {newCard.map((card: any, index: number) => (
            <View key={index}>
              {card.addCard === true ? (
                <ListItem key={index} newCard Icon={getIcon(card.brand)} />
              ) : (
                <ListItem
                  key={index}
                  cards={card}
                  Icon={getIcon(card.brand)}
                  onPress={() => setActiveCardIndex(index)}
                  defaultCard={card.id === CardId ? true : false}
                  activeCard={index === cardIndex ? true : false}
                  handleUpdate={id => {
                    if (card.id === id) {
                      // setCardInfo(card);
                      setActive(!active);
                    } else {
                      setActive(false);
                    }
                  }}
                />
              )}
            </View>
          ))}
        </View>
        <View style={styles.textContainer}>
          <DescriptionText
            textStyle={{textAlign: 'center'}}
            text="We are using the selected card as your default card to make payment and will use this card for future payment as well, you can add, delete multiple cards and make any card as your default card for payments anytime you want."
          />
        </View>
        <View>
          {sequence !== null && sequence !== undefined && (
            <View style={{marginHorizontal: 20}}>
              <ButtonCom
                title="Confirm Payment"
                textAlignment={btnStyles.textAlignment}
                containerStyle={btnStyles.containerStyleFullWidth}
                titleStyle={btnStyles.titleStyle}
                onSelect={onPress}
                loading={loading}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Text_Size.Text_5,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: '5%',
  },
  scrollview: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 20,
    fontSize: Text_Size.Text_1,
    color: Colors.text,
  },
  stars: {
    marginBottom: 0,
    marginTop: 5,
  },
  taskTitle: {
    alignSelf: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  textContainer: {
    paddingHorizontal: 20,
    // flex: 1,
  },
  buttonText: {
    fontSize: SCREEN_WIDTH > 390 ? Text_Size.Text_1 : Text_Size.Text_0,
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: 100,
    marginHorizontal: 20,
    marginBottom: 40,
  },
});

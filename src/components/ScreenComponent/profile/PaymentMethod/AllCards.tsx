/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
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
interface Props {
  cards: any;
}

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

interface TaskInterface {
  title: string;
  index: number;
}
const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));

const BACKGROUND_COLOR = '#FAFBFF';
const AllCards = ({cards}: Props) => {
  const [tasks, setTasks] = useState(TASKS);
  const newCard = [...cards];
  console.log('cards', cards);
  const scrollRef = useRef(null);
  newCard.push({addCard: true, brand: 'new'});
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
      case 'new':
        return <Plus width={50} height={50} />;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} style={styles.scrollview}>
        <HeaderText textStyle={styles.title} text="Your cards" />
        {newCard.map((card: any, index: number) =>
          card.addCard === true ? (
            <ListItem key={index} newCard Icon={getIcon(card.brand)} />
          ) : (
            <ListItem key={index} cards={card} Icon={getIcon(card.brand)} />
          ),
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: Text_Size.Text_5,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingLeft: '5%',
  },
  scrollview: {flex: 1},
});

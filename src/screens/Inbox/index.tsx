import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import HeaderText from '../../components/common/text/HeaderText';
import Colors from '../../constants/Colors';
import Upcoming from '../../components/ScreenComponent/Inbox/Upcoming';
import Pending from '../../components/ScreenComponent/Inbox/Pending';
import Past from '../../components/ScreenComponent/Inbox/Past';
import BottomSpacing from '../../components/UI/BottomSpacing';

const data = [
  {
    id: 1,
    title: 'Upcoming',
    opacity: 1,
  },
  {
    id: 2,
    title: 'Pending',
    opacity: 1,
  },
  {
    id: 3,
    title: 'Past',
    opacity: 1,
  },
];

const Inbox = () => {
  const [showInbox, setShowInbox] = useState(1);
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View style={styles.tabContainer}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => setShowInbox(item.id)}
                style={showInbox === item.id && styles.bottom1}>
                <HeaderText
                  text={item.title}
                  textStyle={
                    showInbox === item.id ? styles.text1 : styles.text2
                  }
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      {showInbox === 1 && <Upcoming />}
      {showInbox === 2 && <Pending />}
      {showInbox === 3 && <Past />}

      <BottomSpacing />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContainer: {
    paddingTop: '4%',

    alignSelf: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
  },
  text1: {
    fontWeight: '600',
    paddingBottom: '1%',
    textAlign: 'center',
    width: '100%',
  },
  bottom1: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  text2: {
    fontWeight: '400',
    paddingBottom: '1%',
  },
});

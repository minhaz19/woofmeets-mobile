import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import HeaderText from '../../components/common/text/HeaderText';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import Colors from '../../constants/Colors';
import Upcoming from '../../components/ScreenComponent/Inbox/Upcoming';
import Pending from '../../components/ScreenComponent/Inbox/Pending';
import Past from '../../components/ScreenComponent/Inbox/Past';
import Archived from '../../components/ScreenComponent/Inbox/Archived';

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
  {
    id: 4,
    title: 'Archived',
    opacity: 1,
  },
];

const Inbox = () => {
  const [showInbox, setShowInbox] = useState(1);
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flexContainer}>
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
          <View style={styles.height} />
        </ScrollView>
        {showInbox === 1 && <Upcoming />}
        {showInbox === 2 && <Pending />}
        {showInbox === 3 && <Past />}
        {showInbox === 4 && <Archived />}
      </View>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  height: {
    width: 90,
  },
  itemContainer: {
    paddingTop: '4%',
    paddingRight:
      SCREEN_WIDTH <= 380 ? '4%' : SCREEN_WIDTH <= 600 ? '6%' : '7%',
    paddingLeft: 10,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  text1: {
    fontWeight: '600',
    paddingBottom: '3%',
  },
  bottom1: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  text2: {
    fontWeight: '400',
  },
});

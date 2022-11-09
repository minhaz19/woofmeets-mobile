/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../constants/Colors';
import BottomSpacing from '../../components/UI/BottomSpacing';
import ScreenRapperGrey from '../../components/common/ScreenRapperGrey';
import {SCREEN_WIDTH} from '../../constants/WindowSize';
import {useTheme} from '../../constants/theme/hooks/useTheme';
import TitleText from '../../components/common/text/TitleText';
import PendingStatus from '../../components/ScreenComponent/Inbox/Pending';
import ApprovedStatus from '../../components/ScreenComponent/Inbox/Approved';
import CompletedStatus from '../../components/ScreenComponent/Inbox/Completed';
import DeclinedStatus from '../../components/ScreenComponent/Inbox/Declined';
import UserProviderInbox from '../../components/ScreenComponent/Inbox/utils/Common/UserProviderInbox';

const data = [
  {
    id: 1,
    title: 'Pending',
    opacity: 1,
  },
  {
    id: 2,
    title: 'Approved',
    opacity: 1,
  },
  {
    id: 3,
    title: 'Completed',
    opacity: 1,
  },
  {
    id: 4,
    title: 'Declined',
    opacity: 1,
  },
];

const Inbox = () => {
  const [showInbox, setShowInbox] = useState(1);
  const [active, setActive] = useState('USER');
  const {colors, isDarkMode} = useTheme();
  return (
    <ScreenRapperGrey rapperStyle={styles.container}>
      <View style={styles.tabContainer}>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.itemContainer,
                {
                  backgroundColor:
                    showInbox === item.id
                      ? Colors.primary
                      : isDarkMode
                      ? Colors.dark.lightDark
                      : Colors.background,
                  borderRightWidth: 1,
                  borderRightColor: Colors.primary,
                },
              ]}>
              <TouchableOpacity onPress={() => setShowInbox(item.id)}>
                <TitleText
                  text={item.title}
                  textStyle={{
                    fontWeight: '700',
                    marginBottom: '1%',
                    textAlign: 'center',
                    color: showInbox === item.id ? 'white' : colors.headerText,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View>
        <UserProviderInbox setActive={setActive} active={active} />
      </View>
      {showInbox === 1 && <PendingStatus statusType={active} />}
      {showInbox === 2 && <ApprovedStatus statusType={active} />}
      {showInbox === 3 && <CompletedStatus statusType={active} />}
      {showInbox === 4 && <DeclinedStatus statusType={active} />}

      <BottomSpacing />
    </ScreenRapperGrey>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // marginHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',

    // paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'black',
    borderWidth: 1,
    borderColor: Colors.primary,
    // paddingVertical: 5,
  },
  itemContainer: {
    paddingVertical: '2.5%',
    width: SCREEN_WIDTH / 4,

    // alignSelf: 'center',
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontWeight: '700',
    marginBottom: '1%',
    textAlign: 'center',
    width: '100%',
  },
  bottom1: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 5,
  },
  text2: {
    fontWeight: '600',
    paddingBottom: '1%',
  },
});

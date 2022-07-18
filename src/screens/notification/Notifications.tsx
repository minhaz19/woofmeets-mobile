import moment from 'moment';
import React from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TitleText from '../../components/common/text/TitleText';
import DescriptionText from '../../components/common/text/DescriptionText';
import HeaderText from '../../components/common/text/HeaderText';

const Notifications = () => {
  const notifi = [
    {
      id: 1,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 5,
      createdAt: new Date(),
      title:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  if (!notifi) {
    return (
      <View style={styles.loadingText}>
        <HeaderText text="Loading..." />
      </View>
    );
  }

  return (
    <>
      <View style={{height: 4, backgroundColor: '#FFF0F6'}} />
      {notifi?.length > 0 && (
        <FlatList
          data={notifi}
          renderItem={({item}) => (
            <View
              style={{...styles.touchable}}
              key={item.id + Math.floor(Math.random() * 100)}>
              <TouchableOpacity>
                <Card
                  style={styles.headerContainer}
                  containerStyle={styles.contentStyle}>
                  <View style={styles.mainContainer}>
                    <View style={styles.headerSection}>
                      <DescriptionText
                        text={moment(item?.createdAt).fromNow()}
                      />
                      <TitleText text={item?.title} />
                    </View>
                    <Icon
                      name="keyboard-arrow-right"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          )}
          onEndReachedThreshold={0.5}
        />
      )}
      <View style={{height: 40}} />
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 0,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerSection: {
    width: '90%',
    marginLeft: 15,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  loadingText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  contentStyle: {
    shadowColor: Colors.light.background,
    shadowOpacity: 0,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 0,
    backgroundColor: 'white',
    borderBottomWidth: 5,
    borderBottomColor: '#FFF0F6',
  },
  touchable: {
    overflow: 'hidden',
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  nameView: {
    marginLeft: 5,
  },
});

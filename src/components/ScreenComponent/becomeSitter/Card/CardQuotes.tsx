import {View, StyleSheet} from 'react-native';
import React from 'react';
import TitleText from '../../../common/text/TitleText';
import Card from '../../../UI/Card';
import Colors from '../../../../constants/Colors';

const CardQuotes = (props: {comment: string; writter: string}) => {
  return (
    <View>
      <Card style={styles.headerContainer} containerStyle={styles.contentStyle}>
        <View style={styles.viewContainer} />
        <View style={styles.textContainer}>
          <TitleText text={props.comment} textStyle={styles.textStyle} />
          <TitleText text={props.writter} textStyle={styles.textName} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 10,
    elevation: 1,
    width: '90%',
    paddingLeft: '5%',
    marginLeft: '5%',
    top: -60,
    height: 200,
    borderRadius: 8,
  },
  headerContainer: {
    width: '100%',
    borderRadius: 0,
    paddingVertical: 12,
  },
  viewContainer: {
    height: 8,
    width: 100,
    backgroundColor: Colors.green,
    marginVertical: 20,
    borderRadius: 4,
  },
  textContainer: {
    justifyContent: 'center',
    height: '70%',
    width: '90%',
  },
  textName: {
    fontWeight: '600',
    paddingTop: 20,
  },
  textStyle: {
    fontWeight: '500',
  },
});

export default CardQuotes;

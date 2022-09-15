import {
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import Colors from '../../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ShortText from '../../../../common/text/ShortText';

const ProfileItemCard = (props: {
  title: string;
  id: number;
  isCompleted: boolean;
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
  name: string;
}) => {
  const CompletedIcon = () => {
    return (
      <View style={styles.iconContainer} key={props.id}>
        <AntDesign
          name="checkcircle"
          size={12}
          color={Colors.primary}
          style={styles.iconStyle}
        />
      </View>
    );
  };
  const UnCompletedIcon = () => {
    return (
      <View
        style={{
          ...styles.numberViewContainerOuter,
          backgroundColor: Colors.primaryLight,
        }}>
        <View
          style={{
            ...styles.numberViewContainer,
            backgroundColor: Colors.primary,
          }}
        />
      </View>
    );
  };
  const getIconType = (name: string) => {
    switch (name) {
      case 'pet':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'contact':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'provider':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'Gallery':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'basicInfo':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'contact':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
      case 'provider':
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
    }
  };
  return (
    <View style={styles.headerContainer}>
      {!props.isCompleted ? (
        <View
          style={{
            ...styles.numberViewContainerOuter,
            backgroundColor: Colors.primaryLight,
          }}>
          <View
            style={{
              ...styles.numberViewContainer,
              backgroundColor: Colors.primary,
            }}
          />
        </View>
      ) : (
        getIconType(props.name)
      )}
      <ShortText
        text={props.title}
        textStyle={{...styles.textStyle, color: Colors.light.subText}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 1,
    marginVertical: '1%',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontWeight: '500',
    paddingTop: 5,
  },
  numberStyle: {
    fontWeight: '500',
  },
  numberViewContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 6,
    width: 6,
    borderRadius: 100,
  },
  numberViewContainerOuter: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 12,
    width: 12,
    borderRadius: 100,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileItemCard;

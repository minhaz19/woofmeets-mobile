import {
  View,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ShortText from '../../../../common/text/ShortText';
import {useAppDispatch} from '../../../../../store/store';
import {
  setBoardingScreen,
  setProfileScreen,
} from '../../../../../store/slices/onBoarding/initial';
import {useTheme} from '../../../../../constants/theme/hooks/useTheme';

const ProfileItemCard = (props: {
  title: string;
  id: number;
  isCompleted: boolean;
  inProgress: boolean;
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
  name: string;
  isBoarding: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    setLoading(true);
    if (props.isBoarding) {
      dispatch(setBoardingScreen({pass: props.id - 1}));
    } else {
      dispatch(setProfileScreen({pass: props.id - 1}));
    }
    setLoading(false);
  };
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
      default:
        if (props.isCompleted) {
          return <CompletedIcon />;
        } else {
          return <UnCompletedIcon />;
        }
    }
  };
  return (
    <TouchableOpacity style={styles.headerContainer} onPress={handleSubmit}>
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
        textStyle={{
          ...styles.textStyle,
          color: props.inProgress ? Colors.primary : colors.descriptionText,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
  numberStyle: {
    fontWeight: '500',
  },
  numberViewContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 6,
    width: 6,
    borderRadius: 10,
  },
  numberViewContainerOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 12,
    width: 12,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProfileItemCard;

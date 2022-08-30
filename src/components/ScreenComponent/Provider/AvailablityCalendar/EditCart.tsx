import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Text_Size from '../../../../constants/textScaling';
import {Reset} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import ServiceSlotModal from './ServiceSlotModal';
interface Props {
  startingDate: string;
  resetRange: () => void;
}
const EditCart = ({startingDate, resetRange}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  useMemo(() => {
    offset.value = withSpring(startingDate ? 10 / 100 : 300);
  }, [startingDate, offset]);
  const handlePress = () => {};
  return (
    <Animated.View style={[styles.editContainer, animatedStyles]}>
      <View style={styles.availablity}>
        <TouchableOpacity style={styles.markContainer}>
          <Text style={styles.mark}>Mark as unavailable</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtnContainer}
          onPress={() => setIsVisible(true)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.icon} onPress={resetRange}>
        <Reset width={30} height={20} fill={'white'} />
      </TouchableOpacity>
      <ServiceSlotModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onPress={handlePress}
      />
    </Animated.View>
  );
};

export default EditCart;

const styles = StyleSheet.create({
  editContainer: {
    position: 'absolute',
    bottom: '10%',
    backgroundColor: Colors.primary,
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  availablity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  markContainer: {
    borderRightWidth: 1,
    borderRightColor: 'white',
    paddingVertical: 10,
    width: '70%',
  },
  mark: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editBtnContainer: {
    borderRightWidth: 1,
    borderRightColor: 'white',
    paddingVertical: 10,
    width: '22%',
    alignItems: 'center',
  },
  edit: {
    fontSize: Text_Size.Text_0,
    color: Colors.background,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 25,
  },
});

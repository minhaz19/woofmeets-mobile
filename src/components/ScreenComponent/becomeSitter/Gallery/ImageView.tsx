/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {Cross} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';
import {FeatherSvg} from '../../Inbox/utils/SvgComponent/SvgComponent';

interface Props {
  id: string;
  name: string;
  handlePress: (arg1: string) => void;
  handleEdit: (arg1: string) => void;
}

const ImageView = ({id, name, handlePress, handleEdit}: Props) => {
  return (
    <View style={Styles.area}>
      <Image style={Styles.image} source={{uri: name}} />
      <TouchableOpacity
        onPress={() => {
          handlePress(id);
        }}>
        <View style={Styles.delete}>
          <Cross
            height={16}
            width={16}
            color={Colors.dark.text}
            style={{justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleEdit(id);
        }}>
        <View style={Styles.edit}>
          <FeatherSvg
            height={16}
            width={16}
            style={{justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ImageView;
const Styles = StyleSheet.create({
  image: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  area: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.73,
    shadowRadius: 1.62,
    elevation: 4,

    width: 160,
    height: 160,
  },
  delete: {
    width: 26,
    height: 26,
    opacity: 0.8,
    position: 'absolute',
    bottom: 130,
    right: 6,
    backgroundColor: Colors.dark.lightDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: 26,
    height: 26,
    opacity: 0.8,
    position: 'absolute',
    bottom: 5,
    right: 6,
    backgroundColor: Colors.dark.lightDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

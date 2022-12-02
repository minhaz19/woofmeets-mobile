import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import {EditPen, Delete} from '../../../../assets/svgs/SVG_LOGOS';
import Colors from '../../../../constants/Colors';

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
          <Delete width={18} height={18} fill={Colors.primary} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleEdit(id);
        }}>
        <View style={Styles.edit}>
          <EditPen height={24} width={24} fill={Colors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default ImageView;
const Styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  area: {
    width: 140,
    height: 140,
  },
  delete: {
    width: 26,
    height: 26,
    opacity: 0.8,
    position: 'absolute',
    bottom: 106,
    right: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: 26,
    height: 26,
    opacity: 0.8,
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

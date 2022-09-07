import {useState} from 'react';
import {Alert} from 'react-native';
import methods from '../../../../api/methods';
import {useRHFContext} from '../../../../utils/helpers/Form/useRHFContext';

const deleteEndPoint = '/pet/photo/delete/';
const uploadEndpoint = '/pet/photo/upload/';
const captionEndpoint = '/pet/photo/update/';
export const useImagePicker = (name: string) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImgInfo, setSelectedItem] = useState<any>({
    uri: '',
    id: null,
    opk: '',
    caption: '',
  });
  const {setValue, getValues, errors, value} = useRHFContext(name);

  const imageUris = value;
  const imageInfo = getValues('imageInfo');
  const opk = getValues('petOpk');
  // add image
  const handleAdd = async (uri: string) => {
    setValue(name, [...imageUris, uri]);
    const formData = new FormData();
    formData.append('file', {
      name: 'image' + Math.random(),
      type: 'image/jpeg',
      uri: uri,
    });
    await methods._post(`${uploadEndpoint + opk}`, formData);
  };

  // remove image
  const handleRemove = async (uri: string) => {
    setValue(
      name,
      imageUris?.filter((imageUri: string) => imageUri !== uri),
    );
    const selectedItem = imageInfo?.filter((item: any) => item.url === uri);
    await methods._delete(`${deleteEndPoint + opk + '/' + selectedItem[0].id}`);
  };
  // sumbit image to backend
  const handlePress = (uri: string) => {
    const selectedItem =
      imageInfo && imageInfo?.filter((item: any) => item.url === uri);
    if (selectedItem === false) {
      Alert.alert('Please save the changes to add caption');
    } else {
      if (selectedItem.length === 0) {
        Alert.alert('Please save the changes to add caption.');
      } else {
        setIsVisible(true);
        setSelectedItem({
          uri,
          id: selectedItem[0]?.id,
          opk: opk,
          caption: selectedItem[0]?.caption,
        });
      }
    }
  };

  // submit image caption
  const handleSubmit = async (data: any) => {
    const result = await methods._put(
      `${captionEndpoint + opk + '/' + selectedImgInfo?.id}`,
      data,
    );
    result.ok && setIsVisible(false);
  };
  return {
    handleAdd,
    handleRemove,
    handlePress,
    handleSubmit,
    value,
    errors,
    isVisible,
    setIsVisible,
    selectedImgInfo,
  };
};

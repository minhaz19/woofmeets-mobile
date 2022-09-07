import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MiddleModal from '../../../../UI/modal/MiddleModal';
import TitleText from '../../../../common/text/TitleText';
import CaptionBody from './CaptionBody';
import {useForm} from 'react-hook-form';
import Colors from '../../../../../constants/Colors';
interface Props {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
  onPress: (arg: any) => void;
  selectedImgInfo: any;
}
const GalleryImageCaptionModal = ({
  isVisible,
  setIsVisible,
  onPress,
  selectedImgInfo,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      caption: selectedImgInfo.caption,
      mode: 'onChange',
      reValidateMode: 'onChange',
    },
  });

  return (
    <View>
      <MiddleModal
        isModalVisible={isVisible}
        setIsModalVisible={setIsVisible}
        onBlur={() => console.log('')}>
        <View style={styles.CaptionBody}>
          <CaptionBody
            selectedImgInfo={selectedImgInfo}
            name="caption"
            control={control}
            errors={errors}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsVisible(false)}>
            <TitleText text="Cancel" textStyle={styles.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSubmit(onPress)}>
            <TitleText text="Save" textStyle={styles.text} />
          </TouchableOpacity>
        </View>
      </MiddleModal>
    </View>
  );
};

export default GalleryImageCaptionModal;

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row'},
  cancelBtn: {backgroundColor: Colors.primary, flex: 1, padding: 10},
  saveBtn: {backgroundColor: Colors.primary, flex: 1, padding: 10},
  text: {color: 'white', textAlign: 'center'},
  CaptionBody: {width: '100%'},
});

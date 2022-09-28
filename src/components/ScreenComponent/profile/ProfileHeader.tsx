/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_WIDTH} from '../../../constants/WindowSize';
import Colors from '../../../constants/Colors';
import HeaderText from '../../common/text/HeaderText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import ImageUploadModal from '../../UI/modal/ImageUploadModal';
import {useRHFContext} from '../../../utils/helpers/Form/useRHFContext';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import UploadingLoader from '../../common/Loaders/UploadingLoader';
import {useAppDispatch} from '../../../store/store';
import {getUserProfileInfo} from '../../../store/slices/userProfile/userProfileAction';
interface Props {
  name: string;
  gLoading?: boolean;
  url: string | null;
  userName?: string;
}
const slug = '/user-profile/upload-profile-picture';
const img =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
const ProfileHeader = ({name, gLoading, url, userName}: Props) => {
  const {colors} = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [image, setImage] = useState('');
  const {setValue} = useRHFContext(name);
  const dispatch = useAppDispatch();

  const {request, loading} = useApi(methods._post);

  const handleUpload = async (e: any) => {
    setValue(name, e._parts[0][1].uri);
    setImage(e._parts[0][1].uri);
    const result = await request(slug, e);
    if (result.ok) {
      dispatch(getUserProfileInfo());
    }
  };
  return (
    <>
      <View style={styles.topContainer}>
        <View
          style={[
            styles.imageContainer,
            {borderColor: colors.descriptionText},
          ]}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View style={styles.imageStyle}>
              {gLoading || loading ? (
                <UploadingLoader />
              ) : (
                <Image
                  source={{
                    uri: url ? url : img,
                  }}
                  style={styles.image}
                />
              )}
            </View>
            <View
              style={[
                styles.addContainer,
                {borderColor: colors.backgroundColor},
              ]}>
              <Ionicons
                name="md-add"
                size={SCREEN_WIDTH <= 380 ? 16 : SCREEN_WIDTH <= 600 ? 18 : 20}
                color={Colors.light.background}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <HeaderText text={userName ?? ''} />
        </View>
      </View>
      <ImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onBlur={() => null}
        uploadImage={handleUpload}
        setIsImageLoading={setIsImageLoading}
      />
    </>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  nameContainer: {
    padding: 10,
    paddingLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    width: SCREEN_WIDTH <= 380 ? 70 : SCREEN_WIDTH <= 600 ? 90 : 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {width: '100%', height: '100%'},
  addContainer: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    height: 24,
    width: 24,
    bottom: 0,
    right: 0,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default ProfileHeader;

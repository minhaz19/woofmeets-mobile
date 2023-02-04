import {View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {CameraIcon, SendIcon} from '../../../assets/Inbox_SVG';
import styles from '../activity/styles';
import Colors from '../../../constants/Colors';
import {useTheme} from '../../../constants/theme/hooks/useTheme';
import {useApi} from '../../../utils/helpers/api/useApi';
import methods from '../../../api/methods';
import MessageImageUploadModal from '../../../components/UI/modal/MessageImageUploadModal';
import {socket} from '../../../../App';

const SendMessage = ({roomId, setMessages, user, opk}) => {
  const {colors} = useTheme();
  const [content, setContent] = useState({text: '', image: ''});
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [photo, setPhoto] = useState();

  const handleSubmit = () => {
    if (content?.text || content?.image) {
      const data = {
        sender: user?.id,
        group: roomId,
        opk,
        // content: content?.text.replace(/<[^>]*>?/gm, ''),
        content: content?.text,
        image: content?.image,
        createdAt: new Date(),
      };
      setMessages(prevMess => [...prevMess, data]);
      socket.emit('send-message', data, (error: any) => {});
      setContent({text: '', image: ''});
    }
  };

  //Upload photo
  const {request: uploadRequest, loading: uploadLoading} = useApi(
    methods._post,
  );
  const uploadImage = async (_e: any) => {
    const uploadEndPoint = `/appointment/message/upload-file/${opk}`;
    const result = await uploadRequest(uploadEndPoint, _e);
    try {
      setPhoto(result.data[0].url);
      const data = {
        sender: user?.id,
        group: roomId,
        attachmentType: 'image',
        opk,
        content: '',
        attachment: result.data[0].url,
        createdAt: new Date(),
      };
      setMessages(prevMess => [...prevMess, data]);
      socket.emit('send-message', data);
    } catch (err) {}
  };

  return (
    <View style={[styles.footer, {borderColor: colors.borderColor}]}>
      <MessageImageUploadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setIsImageLoading={setIsImageLoading}
        uploadImage={uploadImage}
      />
      <TouchableOpacity
        style={styles.cameraIconContainer}
        onPress={() => setIsModalVisible(true)}>
        <CameraIcon />
      </TouchableOpacity>
      <TextInput
        placeholder="Type Message..."
        style={styles.textInput}
        placeholderTextColor={Colors.placeholder}
        numberOfLines={10}
        onChangeText={text => setContent({...content, text: text})}
        value={content.text}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.5}
        style={styles.sendIcon}>
        <SendIcon height={20} width={20} fill={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default SendMessage;

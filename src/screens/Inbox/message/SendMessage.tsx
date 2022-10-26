import { View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CameraIcon, SendIcon } from '../../../assets/Inbox_SVG'
import styles from '../activity/styles'
import Colors from '../../../constants/Colors'
import { useTheme } from '../../../constants/theme/hooks/useTheme'
import { useAppSelector } from '../../../store/store'

const SendMessage = ({roomId, setMessages, socket}) => {
    const {colors} = useTheme();
    const {userInfo} = useAppSelector(state => state.auth);
    const [content, setContent] = useState({ text: '', image: '' });
    const handleSubmit = () => {
        if (content?.text || content?.image) {
          const data = {
            sender: userInfo?.userInfo?.id,
            group: roomId,
            // content: content?.text.replace(/<[^>]*>?/gm, ''),
            content: content?.text,
            image: content?.image,
            createdAt: new Date(),
          };
    
          setMessages((prevMess) => [...prevMess, data]);
          socket.emit('send-message', data);
          setContent({ text: '', image: '' });
        }
    };
  return (
    <View style={[styles.footer, {borderColor: colors.borderColor}]}>
        <TouchableOpacity style={styles.cameraIconContainer}>
            <CameraIcon />
        </TouchableOpacity>
        <TextInput
            placeholder="Type Message..."
            style={styles.textInput}
            numberOfLines={10}
            onChangeText={text => setContent({ ...content, text: text })}
            value={content.text}
        />
        <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.5}
            style={styles.sendIcon}>
            <SendIcon height={20} width={20} fill={Colors.primary} />
        </TouchableOpacity>
    </View>
  )
}

export default SendMessage
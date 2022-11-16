/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import SwitchView from '../../../components/common/switch/SwitchView';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import HeaderText from '../../../components/common/text/HeaderText';
import MiddleModal from '../../../components/UI/modal/MiddleModal';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  sequence: number;
  isSelectedPet: any;
  setIsSelectedPet?: (value: any) => void;
  onPress: (id: number) => void;
  items: any;
  pets: any;
  handlePress: () => void;
}

const ReportModal = ({
  isModalVisible,
  setIsModalVisible,
  sequence,
  isSelectedPet,
  onPress,
  items,
  handlePress,
}: Props) => {
  return (
    <View>
      <MiddleModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onBlur={undefined}
        isButton
        notOutsidePress
        height={'40%'}
        handlePress={handlePress}>
        <View style={styles.container}>
          <HeaderText
            text={sequence !== 0 && items[sequence - 1].title}
            textStyle={styles.header}
          />
          <ScrollView showsHorizontalScrollIndicator={false}>
            {isSelectedPet?.map(
              (item: {
                selected: any;
                id: number;
                pet: any;
                profile_image: {url: any};
              }) => {
                return (
                  <View key={item?.id} style={styles.innerContainer}>
                    <View style={{paddingRight: 10}}>
                      <ImageAndTitle
                        title={item?.pet?.name}
                        rowImage
                        image={
                          item?.pet?.profile_image
                            ? item?.pet?.profile_image.url
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                        }
                      />
                    </View>
                    <SwitchView
                      isActive={item?.selected}
                      activeText=""
                      inActiveText=""
                      onSelect={() => {
                        onPress(item?.id);
                      }}
                    />
                  </View>
                );
              },
            )}
          </ScrollView>
        </View>
      </MiddleModal>
    </View>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%'},
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: '5%',
  },
  header: {textAlign: 'center', width: '100%', paddingTop: 20},
});

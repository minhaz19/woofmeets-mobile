/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import ReportCount from './ReportCount';
import ImageAndTitle from '../../../components/ScreenComponent/Auth/Common/ImageAndTitle';
import {useTheme} from '../../../constants/theme/hooks/useTheme';

interface Props {
  id: number;
  Icon?: any;
  title: string;
  subTitle?: string;
  image?: any;
  rowImage?: boolean;
  isPeeSelected: any;
  isPooSelected: any;
  isFoodSelected: any;
  isWaterSelected: any;
}
const ReportPet = ({
  id,
  title,
  image,
  isPeeSelected,
  isPooSelected,
  isFoodSelected,
  isWaterSelected,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
      }}>
      <View style={styles.imageAndTitle}>
        <ImageAndTitle id={id} title={title} rowImage image={image} />
      </View>
      <ReportCount
        id={id}
        isPeeSelected={isPeeSelected}
        isPooSelected={isPooSelected}
        isFoodSelected={isFoodSelected}
        isWaterSelected={isWaterSelected}
      />
    </View>
  );
};

export default ReportPet;

const styles = StyleSheet.create({
  imageAndTitle: {
    paddingVertical: 6,
  },
});

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import TitleText from '../../../../common/text/TitleText';
import Text_Size from '../../../../../constants/textScaling';
import AppTouchableOpacity from '../../../../common/AppClickEvents/AppTouchableOpacity';
import Colors from '../../../../../constants/Colors';
import ButtonCom from '../../../../UI/ButtonCom';
import {btnStyles} from '../../../../../constants/theme/common/buttonStyles';
import BottomSpacing from '../../../../UI/BottomSpacing';
import {CancelToken} from 'apisauce';
interface Props {
  setOpenFilter: (arg: boolean) => void;
  setActiveStatus: (arg: string) => void;
  status: {
    value: string;
    title: string;
  };
  setStatus: (arg: any) => void;
  page: number;
  setPage: (arg: number) => void;
  limit: number;
  setLimit: (arg: number) => void;
  sortBy: string;
  setSortBy: (arg: string) => void;
  setError: (arg: boolean) => void;
  sortOrder: string;
  active: string;
  setSortOrder: (arg: string) => void;
  fetchData: (arg: string, arg2: any, arg3?: number, arg4?: boolean) => void;
  setProviderData: (agr: any[]) => void;
  setUserData: (agr: any[]) => void;
}
const daycount = [
  {
    title: 'All',
    value: 'ALL',
  },
  {
    title: 'Proposal',
    value: 'PROPOSAL',
  },
  {
    title: 'Accepted',
    value: 'ACCEPTED',
  },
  {
    title: 'Paid',
    value: 'PAID',
  },
  {
    title: 'Completed',
    value: 'COMPLETED',
  },
  {
    title: 'Cancelled',
    value: 'CANCELLED',
  },
  {
    title: 'Rejected',
    value: 'REJECTED',
  },
];
const sortByAr = [
  {
    title: 'Oldest',
    value: 'asc',
  },
  {
    title: 'Newest',
    value: 'desc',
  },
];
const FilterAppointment = ({
  setOpenFilter,
  setStatus,
  status,
  page,
  limit,
  sortBy,
  setLimit,
  sortOrder,
  setSortOrder,
  fetchData,
  active,
  setPage,
  setError,
  setUserData,
  setProviderData,
  setActiveStatus,
}: Props) => {
  const searchFiler = async () => {
    setActiveStatus(status.title);
    const source = CancelToken.source();
    setError(false);
    setPage(1);
    setUserData([]);
    setProviderData([]);
    fetchData(active, source, 1, false);
    setOpenFilter(false);
  };
  return (
    <View>
      <TitleText
        textStyle={{
          fontWeight: 'bold',
          fontSize: Text_Size.Text_4,
          marginTop: 10,
          textAlign: 'center',
        }}
        text={'Filter'}
      />
      <TitleText text={''} textStyle={{}} />
      <View>
        <TitleText
          textStyle={{
            fontWeight: 'bold',
            marginBottom: 20,
            fontSize: Text_Size.Text_2,
          }}
          text={'Appointment Status: '}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
            flexWrap: 'wrap',

            marginBottom: 20,
          }}>
          {daycount.map((item, index) => (
            <View key={index} style={{}}>
              <AppTouchableOpacity
                onPress={() => setStatus(item)}
                style={{
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 25,
                  paddingHorizontal: 20,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: Colors.border,
                  backgroundColor:
                    item.value === status.value
                      ? Colors.primary
                      : Colors.lightShade,
                }}>
                <TitleText
                  textStyle={{
                    color:
                      item.value === status.value
                        ? Colors.background
                        : Colors.black,
                    fontWeight: 'bold',
                  }}
                  text={item.title}
                />
              </AppTouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          <TitleText
            textStyle={{
              fontWeight: 'bold',
              marginBottom: 20,
              fontSize: Text_Size.Text_2,
            }}
            text={'Sort By Date: '}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              flexWrap: 'wrap',

              marginBottom: 20,
            }}>
            {sortByAr.map((item, index) => (
              <View key={index} style={{}}>
                <AppTouchableOpacity
                  onPress={() => setSortOrder(item.value)}
                  style={{
                    // backgroundColor: false ? Colors.primaryDif : Colors.background,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 25,
                    paddingHorizontal: 20,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: Colors.border,
                    backgroundColor:
                      item.value === sortOrder
                        ? Colors.primary
                        : Colors.lightShade,
                  }}>
                  <TitleText
                    textStyle={{
                      color:
                        item.value === sortOrder
                          ? Colors.background
                          : Colors.black,
                      fontWeight: 'bold',
                    }}
                    text={item.title}
                  />
                </AppTouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View>
        <ButtonCom
          title={'Apply Filter'}
          loading={false}
          textAlignment={btnStyles.textAlignment}
          containerStyle={btnStyles.containerStyleFullWidth}
          titleStyle={btnStyles.titleStyle}
          onSelect={searchFiler}
        />

        <AppTouchableOpacity onPress={() => setOpenFilter(false)}>
          <TitleText
            text="Close Filter"
            textStyle={{
              color: Colors.primary,
              fontWeight: 'bold',
              marginTop: 20,
              textAlign: 'center',
            }}
          />
        </AppTouchableOpacity>
      </View>
      <BottomSpacing />
    </View>
  );
};

export default FilterAppointment;

const styles = StyleSheet.create({});

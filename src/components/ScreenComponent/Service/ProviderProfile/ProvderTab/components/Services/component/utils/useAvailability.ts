/* eslint-disable react-hooks/exhaustive-deps */
import format from 'date-fns/format';
import {useMemo, useState} from 'react';
import methods from '../../../../../../../../../api/methods';
import {useApi} from '../../../../../../../../../utils/helpers/api/useApi';
import {getDates} from './getDates';

const today = new Date();
export const useAvailability = (
  selectedService: any,
  navigation: any,
  monthRef: any,
  providerOpk: any,
) => {
  const [availabileDates, setAvailableDates] = useState([]);
  const {loading, request} = useApi(methods._get);

  const getAvailablity = async (monthData: any, currentMonth?: string) => {
    if (providerOpk !== undefined && selectedService !== undefined) {
      const {startDate, endDate} = getDates(monthData, currentMonth);
      const payload = {
        opk: providerOpk,
        serviceId: selectedService,
        startDate: startDate,
        endDate: endDate,
      };
      const result = await request(
        `/provider/${providerOpk}/calender/${selectedService}`,
        payload,
      );
      if (result.ok && currentMonth !== 'fullYear') {
        setAvailableDates(result?.data.data.dates);
      } else if (result.ok && currentMonth === 'fullYear') {
        navigation.navigate('ProviderCalendar', {
          // @ts-ignore
          availability: result?.data.data.dates,
        });
      } else if (!result.ok && currentMonth === 'fullYear') {
        navigation.navigate('ProviderCalendar', {
          // @ts-ignore
          availability: [],
        });
      } else if (!result.ok) {
        setAvailableDates([]);
      }
    }
  };
  const getCurrentMonthDate = (fullYear?: boolean) => {
    const monthData: any = {
      month: null,
      year: null,
      dateString: null,
    };
    if (
      monthRef?.month === today.getMonth() + 1 ||
      monthRef === null ||
      fullYear === true
    ) {
      monthData.month = today.getMonth() + 1;
      monthData.year = today.getFullYear();
      monthData.dateString = format(today, 'yyyy-MM-dd');
    } else {
      monthData.month = monthRef.month;
      monthData.year = monthRef.year;
      monthData.dateString = null;
    }

    return monthData;
  };

  useMemo(() => {
    const monthData = getCurrentMonthDate();
    getAvailablity(
      monthData,
      monthRef?.month === today.getMonth() + 1 || monthRef === null
        ? 'current'
        : undefined,
    );
  }, [selectedService]);
  return {availabileDates, getAvailablity, loading, getCurrentMonthDate};
};

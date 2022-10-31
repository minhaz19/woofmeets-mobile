import {useState} from 'react';
import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';
// import {getDates} from '../../../Service/ProviderProfile/ProvderTab/components/Services/component/utils/getDates';
import {getSelectedDates} from './getSelectDates';

const endPoint = '/availability/all-service';
export const useProviderAvailability = () => {
  const [availabileDates, setAvailableDates] = useState([]);
  const {loading, request} = useApi(methods._get);

  const getAvailablity = async (monthData: any, currentMonth: string) => {
    const {startDate, endDate} = getSelectedDates(monthData, currentMonth);

    const result = await request(
      endPoint +
        `?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(
          endDate,
        ).toISOString()}`,
    );
    console.log('result', startDate, endDate, result);
    if (result.ok) {
      const allDates = result.data.data?.map((item: any) => [
        ...new Set([...new Set(item.availability.dates)]),
      ]);

      const uniqueChars: any = [...new Set(allDates.flat(1))];
      uniqueChars && setAvailableDates(uniqueChars);
    }
  };
  // const getCurrentMonthDate = (fullYear?: boolean) => {
  //   const monthData: any = {
  //     month: null,
  //     year: null,
  //     dateString: null,
  //   };
  //   if (
  //     monthRef?.month === today.getMonth() + 1 ||
  //     monthRef === null ||
  //     fullYear === true
  //   ) {
  //     monthData.month = today.getMonth() + 1;
  //     monthData.year = today.getFullYear();
  //     monthData.dateString = format(today, 'yyyy-MM-dd');
  //   } else {
  //     monthData.month = monthRef.month;
  //     monthData.year = monthRef.year;
  //     monthData.dateString = null;
  //   }

  //   return monthData;
  // };

  //   useMemo(() => {
  //     const monthData = getCurrentMonthDate();
  //     getAvailablity(monthData, 'current');
  //   }, []);
  return {availabileDates, getAvailablity, loading};
};

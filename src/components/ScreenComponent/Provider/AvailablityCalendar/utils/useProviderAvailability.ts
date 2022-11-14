import {useState} from 'react';
import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';
import {getSelectedDates} from './getSelectDates';

const endPoint = '/availability/all-service';
export const useProviderAvailability = () => {
  const [availabileDates, setAvailableDates] = useState([]);
  const [availableService, setAvailableService] = useState([]);
  const {loading, request} = useApi(methods._get);

  const getAvailablity = async (monthData: any, currentMonth: string) => {
    const {startDate, endDate} = getSelectedDates(monthData, currentMonth);

    const result = await request(
      endPoint +
        `?startDate=${new Date(startDate).toISOString()}&endDate=${new Date(
          endDate,
        ).toISOString()}`,
    );
    if (result.ok) {
      const allDates = result.data.data?.map((item: any) => [
        ...new Set([...new Set(item.availability.dates)]),
      ]);

      const uniqueChars: any = [...new Set(allDates.flat(1))];
      uniqueChars && setAvailableDates(uniqueChars);

      const availableServiceArr = uniqueChars.map(
        (date: string, index: number) => {
          const modAvailableService: any = [];
          const services: any = [];

          result.data.data.map((item: any) => {
            const {dates} = item.availability;
            let tmp = dates.indexOf(date);
            if (tmp !== -1) {
              services.push(item.serviceType.displayName);
            }
          });
          modAvailableService.push({
            id: index,
            date: date,
            services: services,
          });
          return modAvailableService[0];
        },
      );
      availableServiceArr && setAvailableService(availableServiceArr);
    }
  };
  return {availabileDates, getAvailablity, availableService, loading};
};

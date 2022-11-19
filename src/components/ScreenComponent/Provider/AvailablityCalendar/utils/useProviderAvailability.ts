import {useState} from 'react';
import methods from '../../../../../api/methods';
import {useApi} from '../../../../../utils/helpers/api/useApi';
import {formatDate} from '../../../../common/formatDate';
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
      const allDates = result.data.data
        ?.filter((fi: any) => fi.isActive)
        ?.map((item: any) => {
          return [
            ...new Set([
              ...new Set(
                item.availability.dates.map((d: string) =>
                  formatDate(new Date(d.replace(/-/g, '/')), 'yyyy-MM-dd'),
                ),
              ),
            ]),
          ];
        });

      const uniqueChars: any = [...new Set(allDates.flat(1))];
      uniqueChars && setAvailableDates(uniqueChars);

      const availableServiceArr = uniqueChars.map(
        (date: string, index: number) => {
          const modAvailableService: any = [];
          const services: any = [];

          result.data.data
            .filter((fi: any) => fi.isActive)
            ?.map((item: any) => {
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

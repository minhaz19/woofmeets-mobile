import {
  BoardingIcon,
  DoggyDayCareIcon,
  DogWalkingIcon,
  DropInVisitIcon,
  HouseSittingIcon,
} from '../../../../../../../../assets/svgs/Services_SVG';
import {useAppSelector} from '../../../../../../../../store/store';

export const useServices = () => {
  const {services, canHost, atHome} = useAppSelector(
    state => state.providerProfile,
  );
  const calServiceData = services.map((item: any) => ({
    id: item.id,
    value: item.serviceType.displayName.toUpperCase(),
    label: item.serviceType.displayName,
  }));
  const availabilityData = {
    selectData: calServiceData,
    providerOpk: '',
  };

  console.log('formateded servies', services);
  const getIcon = (iconId: string) => {
    switch (iconId) {
      case 'boarding':
        return BoardingIcon;
      case 'house-sitting':
        return HouseSittingIcon;
      case 'drop-in-visits':
        return DropInVisitIcon;
      case 'doggy-day-care':
        return DoggyDayCareIcon;
      case 'dog-walking':
        return DogWalkingIcon;
    }
  };
  console.log('serivices', services);
  const formattedServices = services?.map((item: any) => {
    const ccc =
      item.ServiceHasRates &&
      item?.ServiceHasRates.filter(
        (ite: {serviceTypeHasRatesId: number; amount: number}) =>
          ite.serviceTypeHasRatesId === 1,
      )[0];

    return {
      id: item.id,
      Icon: getIcon(item.serviceType.slug),
      sittingType: item.serviceType.displayName,
      price: ccc?.amount ? ccc.amount : 0,
      perNight: 'Per night',
      location: `in the ${item.serviceType.location}`,
      pricingInfo:
        item?.ServiceHasRates.length !== 0 &&
        item?.ServiceHasRates.map((elm: any) => {
          return elm.serviceTypeHasRatesId !== 1
            ? {
                pricingInfoTitle: elm.serviceTypeRate.serviceRateType.name,
                price: elm.amount,
                perNight: 'Per night',
              }
            : '';
        }),
    };
  });
  console.log('formated', formattedServices);

  return {
    formattedServices,
    canHost,
    atHome,
    availabilityData,
  };
};

/* eslint-disable dot-notation */
import {axiosSSR} from '@lib';
import axios from 'axios';

export const prepareRatesSSP = async (
  ctx: any,
  providerServiceId: any,
  serviceTypeId: any,
) => {
  const ssp = {
    props: {
      serviceTypeId,
    },
  };

  const {
    data: {data: serviceRateTypes},
  } = await axiosSSR(ctx).get(
    `/v1/service-rates/type-has-rate/${serviceTypeId}`,
  );

  // console.log(serviceRateTypes)

  // props for avarage rate and auto calculation percentage
  const baseRate_meta = serviceRateTypes.find(
    rate => rate.serviceRateType.slug === 'base-rate',
  ).serviceRateType.meta;
  // -> parse int
  Object.keys(baseRate_meta).forEach(k => {
    baseRate_meta[k] = Number(baseRate_meta[k]);
  });

  let rates = serviceRateTypes.map((serviceRate: { serviceRateType: any; id: any; }) => ({
    ...serviceRate.serviceRateType,
    serviceId: providerServiceId,
    rateId: serviceRate.id,
    amount: 0,
  }));


  ssp.props['userHasCreatedRates'] = false;

  // TASK: handle rate amounts
  try {
    const {
      data: {data: rateAmounts},
    } = await axiosSSR(ctx).get(`/v1/service-rates/${providerServiceId}`);

    // map rate ammounts by rateId
    let mappedRateAmounts = {};
    rates.forEach(rate => {
      mappedRateAmounts[rate.rateId] = rate;
    });

    rateAmounts.forEach(rate => {
      if (mappedRateAmounts[rate.serviceTypeHasRatesId]) {
        mappedRateAmounts[rate.serviceTypeHasRatesId].amount = rate.amount;
        mappedRateAmounts[rate.serviceTypeHasRatesId]['updateKey'] = rate.id;
      }
    });

    rates = Object.keys(mappedRateAmounts).map(k => mappedRateAmounts[k]);

    ssp.props['userHasCreatedRates'] = true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
    }
  }

  // TASK: substract additional rates from mixed array of rates
  const additionalRates = {};
  rates
    .filter(rate => rate.slug !== 'base-rate')
    .forEach(rate => {
      additionalRates[rate.slug] = rate;
    });

  // !TEMP: Delete this block later when percentage will be added to API
  // ? set percentage and percentage operation manully -> for now we'll add 5% substract from base rate
  Object.keys(additionalRates).forEach(slug => {
    additionalRates[slug] = {
      ...additionalRates[slug],
      percentage: 5,
      autoCalculationMethod: 'SUB', // "ADD"
    };
  });
  // !

  // ? find if the rates are automatically updated based base-rate
  const baseRate = rates.find(rate => rate.slug === 'base-rate');

  // run a loop to check if auto calculation is not added
  let isAutoCalculated = true;

  // * if user has created rates
  if (ssp.props['userHasCreatedRates']) {
    // this checking is only required, after the user creates rates

    for (let rate of Object.keys(additionalRates).map(
      slug => additionalRates[slug],
    )) {
      let calculatedAmount = (
        baseRate.amount * baseRate_meta[rate.slug]
      ).toFixed(0);

      calculatedAmount =
        calculatedAmount === 'NaN' ? 0 : parseInt(calculatedAmount);

      if (rate.amount !== calculatedAmount) {
        isAutoCalculated = false;
        break;
      }
    }
  } else {
    // * if user has not created any rate, we calculate the additional base rate automatically
    // based on base-rate

    baseRate.amount = baseRate_meta['base-rate'];

    // calculate additional rates
    Object.keys(additionalRates).forEach(slug => {
      if (baseRate_meta[slug]) {
        additionalRates[slug].amount = parseInt(
          (baseRate.amount * baseRate_meta[slug]).toFixed(0),
        );
      } else {
        additionalRates[slug].amount = 0;
      }
    });
  }

  ssp.props['additionalRates'] = additionalRates;
  ssp.props['isAutoCalculated'] = isAutoCalculated;
  ssp.props['baseRate'] = baseRate;
  ssp.props['baseRate_meta'] = baseRate_meta;

  return ssp;
};
